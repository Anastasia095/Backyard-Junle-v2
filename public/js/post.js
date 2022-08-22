const newPostHandler = async (event) => {
  event.preventDefault();

const title = document.querySelector('#titlepost-name-input').value.trim();
const body = document.querySelector('#post-input').value.trim();
const type = document.querySelector('#post-type-input').value.trim();

if (title && body && type) {
  const response = await fetch(`/forum`, {
    method: 'POST',
    body: JSON.stringify({ title, body , type }),
    headers: {
      'Content-Type': 'application/json',
      //line above is part of fetch()
    },
  });

  if (response.ok) {
    document.location.replace('/api/profile');
  } else {
    alert('Failed to create post');
  }
}
};

document
.querySelector('#post-form')
.addEventListener('submit', newPostHandler);