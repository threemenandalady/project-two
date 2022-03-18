const postsFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the posts form
  const posts = document.querySelector('#posts-message').value.trim();

  if (posts) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/posts', {
      method: 'POST',
      body: JSON.stringify({ posts }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/posts');
    } else {
      alert(response.statusText);
    }
  }
};

const postFormHandler = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#form-input').value.trim();
  const messageInput = document.querySelector('#message-input').value.trim();

  if (name && messageInput) {
    const response = await fetch('/api/user/posts', {
      method: 'POST',
      body: JSON.stringify({ name, messageInput }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/posts');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector('.posts-form')
  .addEventListener('submit', postFormHandler);
