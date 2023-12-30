document.addEventListener('DOMContentLoaded', function () {
  var userNamePlaceholder = document.getElementById('user-name');
  userNamePlaceholder.innerText = '<%= name %>';
});
