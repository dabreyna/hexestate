## COMNANDO PARA RESTAURAR LA BASE DE DATOS

pg_restore.exe --host "localhost" --port "5432" --username "postgres"
--no-password --role "lotificadora" --dbname "lotificadora" --section=pre-data --section=data --section=post-data --verbose "C:\\shared\\glbackup"
