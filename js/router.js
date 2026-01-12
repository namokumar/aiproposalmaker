
import LandingPage from './views/LandingPage.js';
import Login, { setupLogin } from './views/Login.js';
import Signup, { setupSignup } from './views/Signup.js';
import Dashboard, { setupDashboard } from './views/Dashboard.js';
import Loading, { setupLoading } from './views/Loading.js';
import TemplateSelection, { setupTemplateSelection } from './views/TemplateSelection.js';
import Preview, { setupPreview } from './views/Preview.js';
import supabase from './supabase.js';

const routes = {
    'landing': {
        view: LandingPage, setup: () => {
            // Landing page specific setup (data injection)
            import('./app.js').then(appModule => {
                if (appModule.renderCards) appModule.renderCards();
            });
        }
    },
    'login': { view: Login, setup: setupLogin },
    'signup': { view: Signup, setup: setupSignup },
    'dashboard': { view: Dashboard, setup: setupDashboard },
    'loading': { view: Loading, setup: setupLoading },
    'templates': { view: TemplateSelection, setup: setupTemplateSelection },
    'preview': { view: Preview, setup: setupPreview }
};

async function router() {
    const app = document.getElementById('app');
    const hash = window.location.hash.slice(1).toLowerCase() || 'landing';

    // Simple route matching
    let route = routes[hash];

    // Default to landing
    if (!route) {
        if (hash === 'dashboard') {
            // Check auth specific for dashboard?
            // We can do it inside the route or here.
            route = routes['dashboard'];
        } else {
            route = routes['landing'];
        }
    }

    // Auth Guard for Dashboard
    if (hash === 'dashboard') {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session) {
            window.location.hash = '#login';
            return;
        }
    }

    // Render the view
    app.innerHTML = route.view();

    // Run setup
    if (route.setup) {
        route.setup();
    }

    // Global re-init for things like icons
    if (window.lucide) {
        window.lucide.createIcons();
    }
}

// Listen for hash changes
window.addEventListener('hashchange', router);

// Run on initial load
window.addEventListener('load', router);
