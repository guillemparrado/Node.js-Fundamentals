# node_bootcamp_sprint1

## Tasca 1.5, Nivell 3

### Instruccions per a l'execució

L'enunciat del nivell 3 conté quatre punts: tres d'implementació i un de documentació. Cada punt d'implementació demana una funció i per simplificar les he anomenat pel número de punt: `ex1`, `ex2` i `ex3`.

Com que cal resoldre molts detalls per poder-les implementar i encara no tinc prou soltesa en JS, després de molt spaguetti m'he decantat per fer una demo que resolgui només la part del workflow de comprimir, encriptar, descomprimir i desencriptar (tot en memòria). Aquesta era la part que m'estava donant més problemes i així he tingut una primera versió de codi funcional des de la qual implementar la resta de l'exercici. La demo està disponible a la funció `demo`.

Pel que fa a les funcions de cada punt, també he creat la funció `exercicisNivell3` que inicialitza les variables necessàries i crida les tres funcions. Tant la funció `demo` com la funció `exercicisNivell3` són cridades pel mateix arxiu de JS, per això l'únic que cal per executar tot el nivell és executar l'arxiu de JS sencer. El codi de l'exercici s'ha comentat posant èmfasi en les diferents decisions de disseny i punts a tenir en compte a l'hora de fer-lo servir.

Pel que fa als fitxers resultants, aquests s'han anomenat afegint una extensió al fitxer original que denoti els mètodes que se li han aplicat: d'aquesta manera, es pot comprovar com cada funció fa allò que se li demana. Així, a partir de l'arxiu `fileTest.txt`, la funció `ex1` genera els arxius `fileTest.txt.hex` i `fileTest.txt.base64`, `ex2` elimina aquests fitxers i genera `fileTest.txt.hex.aes-192-cbc` i `fileTest.txt.base64.aes-192-cbc` i `ex3` usa els fitxers produits per `ex2`, els desencripta i descomprimeix i els desa afegint l'extensió `.decrypted_uncompressed` a tota la cadena d'extensions anteriors.

_Aclariment_: entre els fitxers produits pel nivell 3 hi trobareu l'arxiu `fileTest.txt.gz`, però aquest és un fitxer de sortida de l'exercici 1 del **nivell 2** i no té relació amb la resta d'arxius del nivell 3.