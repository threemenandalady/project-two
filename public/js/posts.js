const newFormHandler = async function (event) {
  event.preventDefault();
  const message = document.querySelector('#message-input').value;
  const categories = document.querySelector('#dropdown-input').value;

  await fetch(`/api/posts`, {
    method: 'POST',
    body: JSON.stringify({
      message,
      categories,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  document.location.replace('/');
};

document
  .querySelector('.posts-message')
  .addEventListener('submit', newFormHandler);
