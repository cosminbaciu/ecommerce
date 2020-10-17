# Configurare mediu de lucru


### Tools

1. Maven 3.0+ 
2. Un IDE (noi am folosit IntelliJ)
3. JDK 1.8+

### Instalare JDK


```
$ sudo apt update
```

Verificam daca java este deja instalat:

```
$ java -version
```

Daca rezultatul este negativ, instalam JRE

```
$ sudo apt install openjdk-8-jre
```
si verificam iar daca este s-a instalat:

```
$ java -version
```

Daca vedem urmatorul output:

```
Output
openjdk version "1.8.0_162"
OpenJDK Runtime Environment (build 1.8.0_162-8u162-b12-1-b12)
OpenJDK 64-Bit Server VM (build 25.162-b12, mixed mode)
```
     
Continuam cu instalarea JDK-ului:

```
$ sudo apt install openjdk-8-jdk
```

Cele mai multe programe java utilizeaza variabila de mediu JAVA_HOME astfel incat trebuie setata. 


```
$ sudo update-alternatives --config java
```

Mai intai trebuie sa vedem unde este instalat. In tabel cautam /usr/lib/jvm/java-8-openjdk-amd64/jre/bin/java:

---
Deschidem fisierul /etc/environment 


```
$ sudo nano /etc/environment
```

La sfarsitul fisierului inlocuim calea cu cea determinata mai sus:

```
JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64/bin/"
```

Reincarcam fisierul:
```
$ source /etc/environment
```

Verificam daca modificarea a avut loc
```
$ echo $JAVA_HOME
```

Outputul trebuie sa coincida cu modificarea facuta mai sus.
```
Output
/usr/lib/jvm/java-11-openjdk-amd64/bin/
```

### Instalare Maven

```
$ sudo apt install maven
```

``` 
$ mvn -version
```


### Instalare PosttgreSQL

```
$ sudo apt-get install postgresql postgresql-contrib
```

Accesare consola psql:

```
$  sudo -u postgres psql postgres
```

Cream user pentru a accesa aplicatia:

```
postgres=#  create user cosmin with password;
```

Cream baza de date:

```
postgres=# create database utech;
```

Acordam drepturi userului creat anterior:
```
postgres=# grant all privileges on database utech to cosmin;
```

## Rulare aplicatie

Aplicatia este construita in SpringBoot si rulata cu ajutorul Maven.

Pentru a rula aplicatia, intai trebuie sa instalam dependintele

Intram in proiect, in /utech si rulam 

```
$ mvn install
```

```
$ mvn spring-boot:run
```

Cand vedem in consola de run:
```
Started UtechApplication in 6.516 seconds (JVM running for 6.944)
```
mergem in browser si accesam http://localhost:5000/api


## Navigare

In momentul in care accesam http://localhost:5000/api in browser, va aparea formularul de log in. 
Pentru a crea un user, apelam in Postman 

```POST:  http://localhost:5000/api/register/register``` cu body-ul prezentat mai sus. 
Daca raspunsul este favorabil, ne vom putea loga cu userul creat.

1. Pentru a vizualiza si a utiliza mai bine aplicatia, avand doar partea de back-end, am folosit un tool numit Swagger. 
Acesta poate fi accesat, in sesiunea userului curent, la adresa ```http://localhost:5000/api/swagger-ui.html```

Acolo regasim fiecare endpoint cu o interfata mai facila pentru utilizator, cu sugestii de body-uri si autocomplete cu date mock pentru request-uri.

2. O alternativa este apelarea endpoint-urilor direct din terminal, cu ```curl```, cu mentiunea ca trebuie sa adaugam autorizare.

Exemplu: 
```
curl --user cosmin:Fepece1905 -X GET --header 'Accept: application/json' 'http://localhost:8070/getProducts'
```

3. Call-uri in aplicatie se pot face si cu ajutorul lui Postman.



## Front-end

Pentru partea de front-end am folosit limbajul React. 

Am structurat proiectul in pachetele common, components, user si util, pentru o mai buna vizualizare a fisierelor

Proiectul porneste ruland comanda

```
npm start
```

Pentru usurarea dezvoltarii componentei de UI, am folosit biblioteca Material UI care implementeaza Google Material Design.

``````
localhost:3000
