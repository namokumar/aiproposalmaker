"use strict";

import { cardData } from './data.js';


export function renderCards() {
    const Container = document.getElementById('cardContainer');
    if (!Container) return;

    // Clear existing content to avoid duplication if re-rendering
    Container.innerHTML = '';

    // Loop through each card in array
    cardData.forEach(card => {
        const cardHTML = `
        <div class="card">
            <p>
                <i data-lucide="${card.icon}" class="icon icon-blue"></i>
            </p>
            <h4>${card.title}</h4>
            <p>${card.description}</p>
        </div>
    `;
        Container.innerHTML += cardHTML;
    });

    // Re-init icons for the newly added content
    if (window.lucide) {
        window.lucide.createIcons();
    }
}