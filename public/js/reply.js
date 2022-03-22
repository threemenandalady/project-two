const newFormHandler = async function (event) {
  event.preventDefault();
  // const title = document.querySelector('input[name="post-title"]').value;
  const message = document.querySelector('#message-input').value;
  const post_id = document.querySelector('#post_id').value;

  const response = await fetch(`/api/replies`, {
    method: 'POST',
    body: JSON.stringify({
      message,
      post_id,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to create project');
  }
};

document
  .querySelector('.posts-message')
  .addEventListener('submit', newFormHandler);
