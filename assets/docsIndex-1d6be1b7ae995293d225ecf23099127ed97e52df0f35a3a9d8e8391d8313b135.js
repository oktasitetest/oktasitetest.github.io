(function($) {    
  // Handle building the icons and code languages
  var code = [
    { name: 'angular', label: 'Angular' },
    { name: 'react',label: 'React' },
    { name: 'ios',  label: 'iOS' },
    { name: 'nodejs', label: 'Node.js' },
    { name: 'java', label: 'Java' },
    { name: 'dotnet', label: '.NET' },
    { name: 'php', label: 'PHP' },
    { name: 'python', label: 'Python' }
  ]

  function renderCodeLinks() {
    var ul = $('<ul>', {});
    code.forEach(function (language) {
      var li = $('<li>', {});
      var icon = $('<i>', {
        class: 'icon code-' + language.name + '-32',
      });

      var link = $('<a>', {
        text: language.label + ' ›',
        href: '/code/' + language.name + '/',
      });

      li.append(icon);
      li.append(link);
      ul.append(li);
    });
    $('#docs-languages').append(ul);
  }

  if (window.location.pathname.match('^/documentation/')) {
    renderCodeLinks();
  }
})(jQuery);
