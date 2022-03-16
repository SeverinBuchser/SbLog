# sb-log.log.field.module:field-config
## Constatns
| Name | Type | Description | 
| --- | --- | --- |
| `add` | `object` | Configuration to log something which was added. The output will read:<br> `ADDED    dark theme`,<br> where the word "ADDED" is green. | 
| `compile` | `object` | Configuration to log something which was compiled in how many milliseconds. The output will read:<br> `COMPILED dark theme in 1000ms`,<br> where the word "COMPILED" is green. | 
| `start` | `object` | Configuration to log something which was started at some point in time. The output will read:<br> `STARTED  building process at 02:16:21`,<br> where the word "STARTED" is cyan. | 
| `end` | `object` | Configuration to log something which was ended at some point in time. The output will read:<br> `ENDED    building process at 02:16:21`,<br> where the word "ENDED" is cyan. | 
| `entry` | `object` | Configuration to log an entry file. The output will read:<br> `ENTRY    ./dark.scss`,<br> where the word "ENTRY" is cyan. | 
| `copy` | `object` | Configuration to log a copied file, which includes the source and the destination. The output will read:<br> `COPY     ./dark.css  to ./dist/dark.css`,<br> where the word "COPY" is green. | 
| `create` | `object` | Configuration to log a created file and its size. The output will read:<br> `CREATED  ./dark.css  size: 100kb`,<br> where the word "CREATED" is green. | 
| `delete` | `object` | Configuration to log a deleted file. The output will read:<br> `DELETED  ./dark.css`,<br> where the word "DELETED" is red. | 
| `error` | `object` | Configuration to log an error. The output will read:<br> `ERROR    There has been an error!`,<br> where the word "ERROR" and the sentence after are red. | 
| `inform` | `object` | Configuration to log an information. The output will read:<br> `INFO     There is an information, like something is deprecated.`,<br> where the word "INFO" is bold. | 
| `warn` | `object` | Configuration to log a warning. The output will read:<br> `WARNING  There is an important warning!`,<br> where the word "WARNING" and the sentence after are yellow. | 

