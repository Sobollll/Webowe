const umiejetnosci = [
    "HTML",
    "CSS",
    "JavaScript",
    "SQL",
    "GitHub",
    "Praca zespołowa",
    "React",
    "Node.js"
];

function pokazUmiejetnosci(lista) {
    const konterner = document.querySelector("#lista-umiejetnosci");
    for (const nazwa of lista){
        const element = document.createElement("li");
        element.textContent = nazwa;
        konterner.appendChild(element);
    }
}
pokazUmiejetnosci(umiejetnosci);