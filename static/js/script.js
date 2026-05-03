/* ============================================
   InterviewAI — Frontend Logic
   ============================================ */

// ===== DOM REFS =====
const chatMessages      = document.getElementById('chatMessages');
const messageInput      = document.getElementById('messageInput');
const sendButton        = document.getElementById('sendButton');
const chatForm          = document.getElementById('chatForm');
const typingIndicator   = document.getElementById('typingIndicator');
const charCountEl       = document.getElementById('charCount');
const charCounter       = charCountEl?.closest('.char-counter');
const welcomeScreen     = document.getElementById('welcomeScreen');
const toast             = document.getElementById('toast');
const sidebar           = document.getElementById('sidebar');
const sidebarToggle     = document.getElementById('sidebarToggle');
const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
const themeToggleBtn    = document.getElementById('themeToggleBtn');
const themeLabel        = themeToggleBtn?.querySelector('.theme-label');
const clearChatBtn      = document.getElementById('clearChatBtn');
const exportBtn         = document.getElementById('exportBtn');
const statQuestions     = document.getElementById('statQuestions');
const statTopics        = document.getElementById('statTopics');

// ===== STATE =====
let isLoading   = false;
let questionCount = 0;
let topicSet      = new Set();
let toastTimer    = null;

// ===== CSRF =====
function getCsrfToken() {
    const match = document.cookie.match(/(?:^|;)\s*csrftoken=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
}

// ===== THEME =====
function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    if (themeLabel) {
        themeLabel.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    applyTheme(current === 'dark' ? 'light' : 'dark');
}

// ===== TOAST =====
function showToast(msg, type = 'info', duration = 2500) {
    clearTimeout(toastTimer);
    toast.textContent = msg;
    toast.className = `toast ${type} show`;
    toastTimer = setTimeout(() => {
        toast.className = `toast ${type}`;
    }, duration);
}

// ===== CHAR COUNTER =====
messageInput.addEventListener('input', () => {
    const len = messageInput.value.length;
    charCountEl.textContent = len;

    if (charCounter) {
        charCounter.className = 'char-counter';
        if (len > 900) charCounter.classList.add('danger');
        else if (len > 750) charCounter.classList.add('warn');
    }

    autoResizeTextarea();
});

function autoResizeTextarea() {
    messageInput.style.height = 'auto';
    messageInput.style.height = Math.min(messageInput.scrollHeight, 160) + 'px';
}

// ===== KEYBOARD: Enter to submit, Shift+Enter for newline =====
messageInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        if (!isLoading && messageInput.value.trim()) {
            chatForm.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
    }
});

// ===== FORM SUBMIT =====
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = messageInput.value.trim();

    if (!message || isLoading) return;

    if (message.length > 1000) {
        showToast('Message too long — max 1000 characters.', 'error');
        return;
    }

    // Hide welcome screen
    if (welcomeScreen) {
        welcomeScreen.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        welcomeScreen.style.opacity = '0';
        welcomeScreen.style.transform = 'translateY(-10px)';
        setTimeout(() => welcomeScreen.remove(), 300);
    }

    addMessage('user', message);
    messageInput.value = '';
    charCountEl.textContent = '0';
    messageInput.style.height = 'auto';
    if (charCounter) charCounter.className = 'char-counter';

    await sendToServer(message);
});

// ===== ADD MESSAGE =====
function addMessage(sender, content) {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const wrapper = document.createElement('div');
    wrapper.className = `message ${sender}`;

    // Meta row (avatar + name + time)
    const meta = document.createElement('div');
    meta.className = 'message-meta';

    const avatar = document.createElement('div');
    avatar.className = `avatar ${sender === 'user' ? 'user-av' : 'bot-av'}`;
    avatar.textContent = sender === 'user' ? 'Y' : 'AI';

    const label = document.createElement('span');
    label.className = 'msg-label';
    label.textContent = sender === 'user' ? 'You' : 'InterviewAI';

    const time = document.createElement('span');
    time.className = 'msg-time';
    time.textContent = timeStr;

    meta.append(avatar, label, time);

    // Bubble
    const bubble = document.createElement('div');
    bubble.className = 'message-bubble';

    if (sender === 'bot') {
        const inner = document.createElement('div');
        inner.className = 'bot-response';
        inner.innerHTML = formatBotResponse(content);
        bubble.appendChild(inner);

        // Attach copy buttons to code blocks
        bubble.querySelectorAll('pre').forEach(pre => {
            const header = document.createElement('div');
            header.className = 'code-block-header';
            const langLabel = document.createElement('span');
            langLabel.textContent = 'code';
            const copyBtn = document.createElement('button');
            copyBtn.className = 'code-copy-btn';
            copyBtn.textContent = 'Copy';
            copyBtn.addEventListener('click', () => {
                const code = pre.querySelector('code')?.textContent || pre.textContent;
                copyToClipboard(code, copyBtn);
            });
            header.append(langLabel, copyBtn);
            pre.parentNode.insertBefore(header, pre);
        });

        questionCount++;
        statQuestions.textContent = questionCount;
    } else {
        bubble.textContent = content;
    }

    // Actions row (copy whole message)
    const actions = document.createElement('div');
    actions.className = 'message-actions';

    const copyMsgBtn = document.createElement('button');
    copyMsgBtn.className = 'action-btn';
    copyMsgBtn.innerHTML = `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Copy`;
    copyMsgBtn.addEventListener('click', () => {
        const text = sender === 'bot'
            ? bubble.querySelector('.bot-response')?.innerText || bubble.innerText
            : bubble.textContent;
        copyToClipboard(text, copyMsgBtn);
    });

    actions.appendChild(copyMsgBtn);

    wrapper.append(meta, bubble, actions);
    chatMessages.appendChild(wrapper);
    scrollToBottom();
}

// ===== MARKDOWN-LIKE FORMATTER =====
function formatBotResponse(text) {
    // Escape HTML first
    const escape = (s) => s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

    // Code blocks ```lang\n...\n```
    text = text.replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre><code>${escape(code.trim())}</code></pre>`;
    });

    // Inline code `...`
    text = text.replace(/`([^`\n]+)`/g, (_, code) => `<code>${escape(code)}</code>`);

    // Headers ### ## #
    text = text.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    text = text.replace(/^## (.+)$/gm,  '<h2>$1</h2>');
    text = text.replace(/^# (.+)$/gm,   '<h1>$1</h1>');

    // Bold **text**
    text = text.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

    // Italic *text*
    text = text.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Horizontal rule ---
    text = text.replace(/^---+$/gm, '<hr>');

    // Unordered lists
    text = text.replace(/^[-*] (.+)$/gm, '<li>$1</li>');
    text = text.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
    // Collapse consecutive ul
    text = text.replace(/<\/ul>\s*<ul>/g, '');

    // Numbered lists
    text = text.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

    // Paragraphs: wrap double newlines
    text = text.replace(/\n{2,}/g, '</p><p>');
    text = '<p>' + text + '</p>';

    // Single newlines → <br> inside paragraphs
    text = text.replace(/\n/g, '<br>');

    // Clean up empty paragraphs
    text = text.replace(/<p>\s*<\/p>/g, '');

    return text;
}

// ===== SEND TO SERVER =====
async function sendToServer(message) {
    isLoading = true;
    sendButton.disabled = true;
    messageInput.disabled = true;
    typingIndicator.style.display = 'flex';
    scrollToBottom();

    // Track topic
    topicSet.add(message.toLowerCase().substring(0, 30));
    statTopics.textContent = topicSet.size;

    try {
        const response = await fetch('/api/chat/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCsrfToken(),
            },
            body: JSON.stringify({ message })
        });

        typingIndicator.style.display = 'none';
        const data = await response.json();

        if (data.success) {
            addMessage('bot', data.response);
        } else {
            const msg = data.error || 'Something went wrong generating questions.';
            showToast('Error: ' + msg, 'error', 5000);
            addErrorBubble(msg);
        }
    } catch (err) {
        typingIndicator.style.display = 'none';
        const msg = err instanceof TypeError
            ? 'Cannot connect to server. Is Django running?'
            : 'Network error — please try again.';
        showToast(msg, 'error', 5000);
        addErrorBubble(msg);
    } finally {
        isLoading = false;
        sendButton.disabled = false;
        messageInput.disabled = false;
        messageInput.focus();
    }
}

// ===== ERROR BUBBLE =====
function addErrorBubble(msg) {
    const wrapper = document.createElement('div');
    wrapper.className = 'message bot';
    wrapper.innerHTML = `
        <div class="message-meta">
            <div class="avatar bot-av">AI</div>
            <span class="msg-label">InterviewAI</span>
        </div>
        <div class="message-bubble" style="border-color:rgba(239,68,68,0.3);background:rgba(239,68,68,0.08);">
            <span style="color:#fca5a5;font-size:13px;">⚠ ${msg}</span>
        </div>`;
    chatMessages.appendChild(wrapper);
    scrollToBottom();
}

// ===== COPY TO CLIPBOARD =====
async function copyToClipboard(text, btn) {
    try {
        await navigator.clipboard.writeText(text);
        const original = btn.textContent || btn.innerHTML;
        btn.textContent = '✓ Copied!';
        showToast('Copied to clipboard', 'success');
        setTimeout(() => {
            if (btn.textContent === '✓ Copied!') {
                btn.innerHTML = original;
            }
        }, 2000);
    } catch {
        showToast('Copy failed — try manually', 'error');
    }
}

// ===== SCROLL =====
function scrollToBottom() {
    requestAnimationFrame(() => {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });
}

// ===== SIDEBAR TOGGLE (desktop) =====
sidebarToggle?.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
});

// ===== SIDEBAR TOGGLE (mobile) =====
let overlay = null;

function openMobileSidebar() {
    sidebar.classList.add('mobile-open');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'sidebar-overlay';
        document.body.appendChild(overlay);
        overlay.addEventListener('click', closeMobileSidebar);
    }
    overlay.style.display = 'block';
    requestAnimationFrame(() => overlay.style.opacity = '1');
}

function closeMobileSidebar() {
    sidebar.classList.remove('mobile-open');
    if (overlay) {
        overlay.style.opacity = '0';
        setTimeout(() => { if (overlay) overlay.style.display = 'none'; }, 300);
    }
}

mobileSidebarToggle?.addEventListener('click', openMobileSidebar);

// ===== QUICK TOPIC BUTTONS =====
document.querySelectorAll('.topic-btn, .welcome-chip').forEach(btn => {
    btn.addEventListener('click', () => {
        const topic = btn.dataset.topic || btn.textContent.trim();
        messageInput.value = topic;
        charCountEl.textContent = topic.length;
        autoResizeTextarea();
        messageInput.focus();
        closeMobileSidebar();
    });
});

// ===== THEME TOGGLE =====
themeToggleBtn?.addEventListener('click', toggleTheme);

// ===== CLEAR CHAT =====
clearChatBtn?.addEventListener('click', () => {
    const msgs = chatMessages.querySelectorAll('.message');
    if (msgs.length === 0) {
        showToast('Chat is already empty', 'info');
        return;
    }
    msgs.forEach(m => {
        m.style.transition = 'opacity 0.2s ease, transform 0.2s ease';
        m.style.opacity = '0';
        m.style.transform = 'scale(0.97)';
    });
    setTimeout(() => {
        msgs.forEach(m => m.remove());
        questionCount = 0;
        topicSet.clear();
        statQuestions.textContent = '0';
        statTopics.textContent = '0';

        // Recreate welcome screen
        const ws = document.createElement('div');
        ws.className = 'welcome-screen';
        ws.id = 'welcomeScreen';
        ws.innerHTML = document.querySelector('.welcome-screen')?.innerHTML || '';
        chatMessages.appendChild(ws);
        reattachChipListeners();
        showToast('Chat cleared', 'info');
    }, 250);
});

// ===== EXPORT CHAT =====
exportBtn?.addEventListener('click', () => {
    const messages = chatMessages.querySelectorAll('.message');
    if (messages.length === 0) {
        showToast('Nothing to export', 'info');
        return;
    }

    let text = `InterviewAI — Chat Export\n${'='.repeat(40)}\nExported: ${new Date().toLocaleString()}\n\n`;

    messages.forEach(msg => {
        const isUser = msg.classList.contains('user');
        const label  = isUser ? 'You' : 'InterviewAI';
        const time   = msg.querySelector('.msg-time')?.textContent || '';
        const content = isUser
            ? msg.querySelector('.message-bubble')?.textContent?.trim()
            : msg.querySelector('.bot-response')?.innerText?.trim();

        if (content) {
            text += `[${label}] ${time}\n${content}\n\n${'─'.repeat(40)}\n\n`;
        }
    });

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `interview-chat-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Chat exported!', 'success');
});

// ===== REATTACH CHIP LISTENERS (after clear) =====
function reattachChipListeners() {
    document.querySelectorAll('.welcome-chip').forEach(btn => {
        btn.addEventListener('click', () => {
            const topic = btn.dataset.topic || btn.textContent.trim();
            messageInput.value = topic;
            charCountEl.textContent = topic.length;
            autoResizeTextarea();
            messageInput.focus();
        });
    });
}

// ===== INIT =====
function init() {
    // Restore theme
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);

    // Restore sidebar state
    const wasCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
    if (wasCollapsed) sidebar?.classList.add('collapsed');

    messageInput.focus();
}

document.addEventListener('DOMContentLoaded', init);
