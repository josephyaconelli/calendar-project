const createSharedEventPage = (description, start, end, title, busy, id) => {

  return `
    <html>
      <head>
        <title>${title}</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      </head>
      <div class="container" style="margin-top: 50px;">
        <div class="jumbotron">
          <h1 class="display-4">${title}</h1>
          <p class="lead" style="max-width: 800px;">${description}</p>
          <ul class="list-group list-group-flush">
            <li class="list-group-item" style="background: #ffffff00 !important;">Start: ${start}</li>
            <li class="list-group-item" style="background: #ffffff00 !important;">End: ${end}</li>
            <!--<li class="list-group-item" style="background: #ffffff00 !important;">Busy status: ${busy ? 'busy' : 'available'}</li>-->
          </ul>
          <br/>
          <!--<a href="http://localhost:3000/login?action=add&id=${id}" class="btn btn-primary" role="button">Add to my calendar</a>-->
        </div>
      </div>
    </html>
  `
}

module.exports = createSharedEventPage