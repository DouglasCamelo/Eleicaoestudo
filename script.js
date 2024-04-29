document.addEventListener('DOMContentLoaded', function () {
    Papa.parse('data.csv', {
        download: true,
        header: true,
        complete: function (results) {
            console.log(results.data);
            var tableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
            var filterCandidate = document.getElementById('filterCandidate');
            var filterParty = document.getElementById('filterParty');

            // Limpar opções de filtro existentes
            filterCandidate.innerHTML = '<option value="">Todos os Candidatos</option>';
            filterParty.innerHTML = '<option value="">Todos os Partidos</option>';

            // Preencher opções de filtro com os dados obtidos
            var candidates = [];
            var parties = [];
            results.data.forEach(function (row) {
                candidates.push(row['Candidato']);
                parties.push(row['Partido']);
            });
            candidates = Array.from(new Set(candidates)); // Remover duplicatas
            parties = Array.from(new Set(parties)); // Remover duplicatas
            candidates.forEach(function (candidate) {
                var option = document.createElement('option');
                option.value = candidate;
                option.textContent = candidate;
                filterCandidate.appendChild(option);
            });
            parties.forEach(function (party) {
                var option = document.createElement('option');
                option.value = party;
                option.textContent = party;
                filterParty.appendChild(option);
            });

            // Mostrar todos os resultados ao carregar
            displayResults(results.data);

            // Adicionar event listeners para os filtros
            filterCandidate.addEventListener('change', function () {
                var candidate = this.value;
                var filteredResults = results.data.filter(function (row) {
                    return candidate === '' || row['Candidato'] === candidate;
                });
                displayResults(filteredResults);
            });

            filterParty.addEventListener('change', function () {
                var party = this.value;
                var filteredResults = results.data.filter(function (row) {
                    return party === '' || row['Partido'] === party;
                });
                displayResults(filteredResults);
            });
        }
    });
});

function displayResults(data) {
    var tableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Limpar tabela
    data.forEach(function (row) {
        var newRow = tableBody.insertRow();
        Object.values(row).forEach(function (value) {
            var newCell = newRow.insertCell();
            newCell.textContent = value;
        });
    });
}
