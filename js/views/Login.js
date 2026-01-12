
import supabase from '../supabase.js';

export default function Login() {
    // Render the HTML
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
          <h2 class="auth-title">Welcome Back</h2>
          <p class="auth-subtitle">Sign in to your account to continue</p>
        </div>

        <form id="loginForm">
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

          <div class="auth-actions">
            <label style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: #4b5563;">
              <input type="checkbox"> Remember me
            </label>
            <button type="button" class="auth-link">Forgot password?</button>
          </div>

          <button type="submit" class="auth-button">Sign In</button>
        </form>

        <div class="auth-footer">
          Don't have an account? 
          <button class="auth-link" onclick="window.location.hash = '#signup'">Sign up</button>
        </div>
      </div>
    </div>
    `;
}

// Logic to attach event listeners after render
export function setupLogin() {
    const form = document.getElementById('loginForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const btn = form.querySelector('button[type="submit"]');

        try {
            btn.textContent = 'Signing in...';
            btn.disabled = true;

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });

            if (error) throw error;

            // Redirect to dashboard on success
            window.location.hash = '#dashboard';
        } catch (error) {
            alert(error.message);
        } finally {
            btn.textContent = 'Sign In';
            btn.disabled = false;
        }
    });
}
