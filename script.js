const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginForm = document.getElementById('loginForm');
const signupForm = document.getElementById('signupForm');
const exploreBtn = document.getElementById('exploreBtn');
const newsList = document.getElementById('news-list');

// Toggle Forms
loginBtn.addEventListener('click', () => {
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
  loginBtn.classList.add('active');
  signupBtn.classList.remove('active');
});

signupBtn.addEventListener('click', () => {
  loginForm.style.display = 'none';
  signupForm.style.display = 'block';
  signupBtn.classList.add('active');
  loginBtn.classList.remove('active');
});

// Explore Button
exploreBtn.addEventListener('click', () => {
  window.location.href = 'explore.html';
});

document.addEventListener('DOMContentLoaded', () => {
  // Fetch news from NewsAPI
  const API_KEY = 'your_api_key'; // Replace with your NewsAPI key
  const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

  fetch(NEWS_API_URL)
    .then(response => response.json())
    .then(data => {
      if (data.status === 'ok') {
        data.articles.forEach(article => {
          const articleItem = document.createElement('li');
          articleItem.innerHTML = `
            <h3>${article.title}</h3>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
          `;
          newsList.appendChild(articleItem);
        });
      } else {
        newsList.innerHTML = '<p>Failed to load news articles. Please try again later.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching news:', error);
      newsList.innerHTML = '<p>Error loading news. Please check your internet connection.</p>';
    });

  // Dark Mode Toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkModeToggle.textContent = document.body.classList.contains('dark-mode') ? 'Light Mode' : 'Dark Mode';
  });

  // Real-time Clock
  const clock = document.getElementById('clock');
  setInterval(() => {
    const now = new Date();
    clock.textContent = now.toLocaleTimeString();
  }, 1000);

  // Custom Welcome Message
  const welcomeMessage = document.getElementById('welcomeMessage');
  const userName = localStorage.getItem('userName') || 'Guest';
  welcomeMessage.textContent = `Welcome, ${userName}!`;
});

