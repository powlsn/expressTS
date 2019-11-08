(function() {
  const url = document.getElementById('edit-form').action;
  const data = {
    id: document.getElementById('data-id').value,
    name: document.getElementById('name').value,
    firstname: document.getElementById('firstname').value,
    lastname: document.getElementById('lastname').value,
  };
  console.log(data);
})();
