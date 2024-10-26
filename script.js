const opinionCards = document.getElementById("opinionCards");
const commentForm = document.getElementById("commentForm");
const inputForComment = document.getElementById("inputText");

fetch("http://localhost:3000/comments")
  .then((loadedPosts) => {
    if (!loadedPosts.ok) {
      throw new Error("Network response was not ok");
    }

    return loadedPosts.json();
  })
  .then((comments) => {
    commentDisplay(comments, opinionCards);
  });

const commentDisplay = (comments, container) => {
  const displayLenght = 3;

  comments.slice(0, displayLenght).forEach((comment) => {
    const createComment = document.createElement("div");
    createComment.classList.add("comment-style");
    createComment.innerHTML = `
                      <span>${comment.newCom}</span>
                  `;
    container.appendChild(createComment);
  });

  if (comments.length > displayLenght) {
    const showMoreButton = document.createElement("button");
    showMoreButton.classList.add('show-more')
    showMoreButton.textContent = "Показать все комментарии...";

    showMoreButton.onclick=() => {
      comments.slice(displayLenght).forEach((comment) => {
        const createComment = document.createElement("div");
        createComment.classList.add("comment-style");
        createComment.innerHTML = `
                              <span>${comment.newCom}</span>
                          `;
        container.appendChild(createComment);
      });
      showMoreButton.remove()

    };
    container.appendChild(showMoreButton);
  }
};

commentForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const newComment = {
    newCom: inputForComment.value.trim(),
  };

  fetch("http://localhost:3000/comments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newComment),
  });
});
