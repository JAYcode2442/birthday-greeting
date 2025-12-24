// DOM Elements
const birthdayPresent = document.getElementById('birthday-present');
const boxTop = document.getElementById('box-top');
const messageContainer = document.getElementById('message-container');
const birthdayMessage = document.getElementById('birthday-message');
const recipientInput = document.getElementById('recipient');
const messageInput = document.getElementById('message');
const updateMessageBtn = document.getElementById('update-message');
const closeMessageBtn = document.getElementById('close-message');
const colorOptions = document.querySelectorAll('.color-option');
const resetPresentBtn = document.getElementById('reset-present');
const wishElements = document.querySelectorAll('.wish');
const confettiContainer = document.getElementById('confetti-container');
const birthdayAudio = document.getElementById('birthday-audio');

// State
let isPresentOpen = false;
let currentBoxColor = '#FF6B8B';
let currentRibbonColor = '#4ECDC4';

// Predefined messages
const wishMessages = [
    "Hope your birthday is as amazing as you are!",
    "Cheers to another year of wonderful you!",
    "May all your birthday wishes come true!",
    "Sending you smiles for every moment of your special day!",
    "Wishing you health, happiness, and prosperity!",
    "May your birthday be filled with laughter and joy!",
    "Here's to celebrating you today and always!",
    "Hope your special day brings you all that your heart desires!"
];

// Initialize the application
function init() {
    // Set up event listeners
    setupEventListeners();
    
    // Initialize audio
    birthdayAudio.volume = 0.3;
}

// Set up event listeners
function setupEventListeners() {
    // Click present to open
    birthdayPresent.addEventListener('click', openPresent);
    
    // Update message button
    updateMessageBtn.addEventListener('click', updateMessage);
    
    // Close message button
    closeMessageBtn.addEventListener('click', closeMessage);
    
    // Color options
    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Remove active class from all options
            colorOptions.forEach(opt => opt.classList.remove('active'));
            // Add active class to clicked option
            option.classList.add('active');
            
            // Update present colors
            currentBoxColor = option.getAttribute('data-box');
            currentRibbonColor = option.getAttribute('data-ribbon');
            updatePresentColors();
        });
    });
    
    // Reset present button
    resetPresentBtn.addEventListener('click', resetPresent);
    
    // Wish elements
    wishElements.forEach(wish => {
        wish.addEventListener('click', () => {
            const wishIndex = parseInt(wish.getAttribute('data-wish')) - 1;
            const message = wishMessages[wishIndex] || wishMessages[0];
            messageInput.value = message;
            updateMessage();
            
            // Add visual feedback
            wish.style.transform = 'scale(0.95)';
            setTimeout(() => {
                wish.style.transform = '';
            }, 200);
        });
    });
    
    // Add keyboard shortcut (Spacebar to open present)
    document.addEventListener('keydown', (e) => {
        if (e.code === 'Space' && !isPresentOpen) {
            e.preventDefault();
            openPresent();
        }
    });
}

// Open the present
function openPresent() {
    if (isPresentOpen) return;
    
    isPresentOpen = true;
    
    // Animate box top opening
    boxTop.style.transform = 'rotateX(-120deg)';
    
    // Show message after delay
    setTimeout(() => {
        messageContainer.style.display = 'block';
        
        // Create confetti
        createConfetti();
        
        // Play birthday audio
        birthdayAudio.currentTime = 0;
        birthdayAudio.play().catch(e => console.log("Audio play failed:", e));
        
        // Add pulsing animation to message
        messageContainer.style.animation = 'fadeIn 0.8s';
    }, 800);
}

// Close the message
function closeMessage() {
    messageContainer.style.display = 'none';
    boxTop.style.transform = 'rotateX(0deg)';
    isPresentOpen = false;
    
    // Stop audio
    birthdayAudio.pause();
    birthdayAudio.currentTime = 0;
    
    // Clear confetti
    confettiContainer.innerHTML = '';
}

// Update the birthday message
function updateMessage() {
    const recipient = recipientInput.value.trim() || 'Friend';
    const message = messageInput.value.trim() || 'Happy Birthday!';
    
    // Update message text
    const personalizedMessage = `Dear ${recipient}, ${message}`;
    birthdayMessage.textContent = personalizedMessage;
    
    // Update signature
    const signature = document.querySelector('.signature');
    signature.textContent = 'Your Friend';
    
    // Show confirmation feedback
    updateMessageBtn.innerHTML = '<i class="fas fa-check"></i> Updated!';
    updateMessageBtn.style.backgroundColor = '#00B894';
    
    setTimeout(() => {
        updateMessageBtn.innerHTML = '<i class="fas fa-sync-alt"></i> Update Message';
        updateMessageBtn.style.backgroundColor = '';
    }, 1500);
}

// Update present colors
function updatePresentColors() {
    // Update box colors
    const boxBottom = document.querySelector('.box-bottom');
    const boxTop = document.querySelector('.box-top');
    
    if (boxBottom) boxBottom.style.backgroundColor = currentBoxColor;
    if (boxTop) boxTop.style.backgroundColor = darkenColor(currentBoxColor, 20);
    
    // Update ribbon colors
    const ribbonVertical = document.querySelector('.ribbon-vertical');
    const ribbonHorizontal = document.querySelector('.ribbon-horizontal');
    const bowCenter = document.querySelector('.bow-center');
    const bowLoops = document.querySelectorAll('.bow-loop');
    
    if (ribbonVertical) ribbonVertical.style.backgroundColor = currentRibbonColor;
    if (ribbonHorizontal) ribbonHorizontal.style.backgroundColor = currentRibbonColor;
    if (bowCenter) bowCenter.style.backgroundColor = currentRibbonColor;
    
    bowLoops.forEach(loop => {
        loop.style.borderColor = currentRibbonColor;
    });
}

// Reset present to default
function resetPresent() {
    // Reset colors to default
    currentBoxColor = '#FF6B8B';
    currentRibbonColor = '#4ECDC4';
    
    // Update active color option
    colorOptions.forEach(option => {
        option.classList.remove('active');
        if (option.getAttribute('data-box') === '#FF6B8B') {
            option.classList.add('active');
        }
    });
    
    // Reset present colors
    updatePresentColors();
    
    // Close message if open
    if (isPresentOpen) {
        closeMessage();
    }
    
    // Reset box top
    boxTop.style.transform = 'rotateX(0deg)';
    
    // Reset inputs
    recipientInput.value = 'Friend';
    messageInput.value = 'Wishing you a day filled with happiness, joy, and all the things you love the most! May this special day bring you endless smiles and wonderful memories.';
    
    // Update message
    updateMessage();
    
    // Show feedback
    resetPresentBtn.innerHTML = '<i class="fas fa-check"></i> Reset!';
    resetPresentBtn.style.backgroundColor = '#FDCB6E';
    
    setTimeout(() => {
        resetPresentBtn.innerHTML = '<i class="fas fa-redo"></i> Reset Present';
        resetPresentBtn.style.backgroundColor = '';
    }, 1500);
}

// Create confetti animation
function createConfetti() {
    // Clear existing confetti
    confettiContainer.innerHTML = '';
    
    // Confetti colors
    const colors = ['#FF6B8B', '#4ECDC4', '#FDCB6E', '#6C5CE7', '#00B894'];
    
    // Create confetti pieces
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        
        // Random properties
        const size = Math.random() * 10 + 5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 3 + 2;
        const animationDelay = Math.random() * 2;
        
        // Apply styles
        confetti.style.width = `${size}px`;
        confetti.style.height = `${size}px`;
        confetti.style.backgroundColor = color;
        confetti.style.left = `${left}%`;
        confetti.style.animationDuration = `${animationDuration}s`;
        confetti.style.animationDelay = `${animationDelay}s`;
        
        // Random shape
        if (Math.random() > 0.5) {
            confetti.style.borderRadius = '50%';
        } else {
            confetti.style.borderRadius = '0';
        }
        
        confettiContainer.appendChild(confetti);
    }
    
    // Remove confetti after animation
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 5000);
}

// Helper function to darken a color
function darkenColor(color, percent) {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    
    return '#' + (
        0x1000000 +
        (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)
    ).toString(16).slice(1);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);