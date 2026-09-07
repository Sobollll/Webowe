git add - dodaje plik do obszaru przechowywania (staging area) w Git. Używa się go, aby przygotować zmiany do zatwierdzenia (commit). Na przykład, aby dodać plik o nazwie "plik.txt", używa się polecenia:

```
git add plik.txt
```
git commit - tworzy nowy commit z plików znajdujących się w obszarze przechowywania. Commit zapisuje zmiany w historii projektu. Aby utworzyć commit, używa się polecenia:

```
git commit -m "Opis zmian"
```
git push - wysyła lokalne commity do zdalnego repozytorium.
```
git push origin main
```
git pull - pobiera zmiany z zdalnego repozytorium i scala je z lokalnym repozytorium. Używa się go, aby zaktualizować lokalne repozytorium o najnowsze zmiany. Na przykład:

```
git pull origin main
```
git status - wyświetla aktualny stan repozytorium, w tym zmiany w plikach, które zostały dodane do obszaru przechowywania oraz te, które nie zostały jeszcze dodane. Aby sprawdzić status repozytorium, używa
    się polecenia:
    
```
git status
```
git log - wyświetla historię commitów w repozytorium. Można zobaczyć szczegóły każdego commita, takie jak identyfikator, autora, datę i wiadomość. Aby wyświetlić historię commitów, używa się polecenia:
```
git log
```
git switch - pozwala na przełączanie się między gałęziami w repozytorium. Aby przełączyć się na istniejącą gałąź, używa się polecenia:

```
git switch nazwa_gałęzi
```
Aby utworzyć nową gałąź i od razu się na nią przełączyć, można użyć polecenia:
```
git switch -c nowa_gałąź
```
git merge - scala zmiany z jednej gałęzi do drugiej. Aby scalić zmiany z gałęzi "feature" do gałęzi "main", należy najpierw przełączyć się na gałąź "main", a następnie użyć polecenia:
```
git merge feature
```
git branch - wyświetla listę gałęzi w repozytorium. Aby zobaczyć wszystkie gałęzie, używa się polecenia:
```
git branch
```
git config - pozwala na konfigurację ustawień Git, takich jak nazwa użytkownika i adres e-mail. Aby ustawić nazwę użytkownika, używa się polecenia:
```
git config --global user.name "Twoje Imię"
```
Aby ustawić adres e-mail, używa się polecenia:
```
git config --global user.email "
