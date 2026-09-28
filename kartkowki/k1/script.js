const budujListe = (tablica) =>
    tablica
        .map(
            ({ imie, obecnosc }) =>
                `<li class="${obecnosc >= 90 ? "wyrozniony" : ""}">${imie} — ${obecnosc}%</li>`
        )
        .join("");

const odfiltrowani = uczniowie.filter(({ srednia }) => srednia >= 4.0);

const sumaObecnosci = odfiltrowani.reduce((suma, { obecnosc }) => suma + obecnosc, 0);
const sredniaObecnosc = odfiltrowani.length > 0 ? sumaObecnosci / odfiltrowani.length : 0;

const listaElement = document.querySelector("#lista");
const podsumowanieElement = document.querySelector("#podsumowanie");

listaElement.innerHTML = budujListe(odfiltrowani);
podsumowanieElement.textContent = `Uczniów: ${odfiltrowani.length} · średnia obecność: ${sredniaObecnosc}%`;
