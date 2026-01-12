
import supabase from '../supabase.js';

export default function Signup() {
    return `
    <div class="auth-container">
      <div class="auth-card">
        <button class="back-button" onclick="window.location.hash = '#landing'">
          <i data-lucide="arrow-left" style="width: 16px; height: 16px;"></i>
          Back to Home
        </button>

        <div class="auth-header">
          <div class="auth-icon-wrapper">
            <i data-lucide="sparkles" class="icon icon-blue" style="width: 32px; height: 32px;"></i>
          </div>
          <h2 class="auth-title">Create Account</h2>
          <p class="auth-subtitle">Get started with AI Proposal Generator</p>
        </div>

        <form id="signupForm">
          <div class="auth-form-group">
            <label class="auth-label">Full Name</label>
            <div class="auth-input-wrapper">
              <i data-lucide="user" class="auth-input-icon"></i>
              <input type="text" id="name" class="auth-input" placeholder="John Doe" required>
            </div>
          </div>

          <div class="auth-form-group">
            <label class="auth-label">Email Address</label>
            <div class="auth-input-wrapper">
              <i data-lucide="mail" class="auth-input-icon"></i>
              <input type="email" id="email" class="auth-input" placeholder="you@example.com" required>
            </div>
          </div>

          <div class="auth-form-group">
             <label class="auth-label">Password</label>
             <div class="auth-input-wrapper">
               <i data-lucide="lock" class="auth-input-icon"></i>
               <input type="password" id="password" class="auth-input" placeholder="••••••••" required>
             </div>
          </div>

          <div class="auth-form-group">
             <label class="auth-label">Confirm Password</label>
             <div class="auth-input-wrapper">
               <i data-lucide="lock" class="auth-input-icon"></i>
               <input type="password" id="confirmPassword" class="auth-input" placeholder="••••••••" required>
             </div>
          </div>

          <button type="submit" class="auth-button">Create Account</button>
        </form>

        <div class="auth-footer">
          Already have an account? 
          <button class="auth-link" onclick="window.location.hash = '#login'">Sign in</button>
        </div>
      </div>
    </div>
    `;
}

export function setupSignup() {
    const form = document.getElementById('signupForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const btn = form.querySelector('button[type="submit"]');

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            btn.textContent = 'Creating account...';
            btn.disabled = true;

            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name
                    }
                }
            });

            if (error) throw error;

            alert('Account created! Please sign in.');
            window.location.hash = '#login';
        } catch (error) {
            alert(error.message);
        } finally {
            btn.textContent = 'Create Account';
            btn.disabled = false;
        }
    });
}
