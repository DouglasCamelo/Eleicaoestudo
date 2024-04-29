document.addEventListener('DOMContentLoaded', function () {
    Papa.parse('data.csv', {
        download: true,
        header: true,
        complete: function (results) {
            console.log(results.data);
            var tableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
            results.data.forEach(function (row) {
                var newRow = tableBody.insertRow();
                Object.values(row).forEach(function (value) {
                    var newCell = newRow.insertCell();
                    newCell.textContent = value;
                });
            });
        }
    });
});
