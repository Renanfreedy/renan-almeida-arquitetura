PUBLICAÇÃO NO GITHUB PAGES

1. Crie um repositório público no GitHub chamado, por exemplo:
   renan-almeida-arquitetura

2. Envie TODOS os arquivos desta pasta para a raiz do repositório.
   O arquivo index.html precisa ficar na raiz, junto com styles.css, script.js, galeria.html, CNAME e a pasta assets.

3. No GitHub, entre no repositório:
   Settings > Pages

4. Em Build and deployment:
   Source: Deploy from a branch
   Branch: main
   Folder: /root
   Clique em Save.

5. Ainda em Settings > Pages, confira Custom domain:
   arquitetorenan.com

6. Depois configure os DNS no Wix:
   - Apague os 3 registros A do Wix:
     185.230.63.107
     185.230.63.186
     185.230.63.171

   - Crie 4 registros A para o domínio raiz arquitetorenan.com:
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153

   - Edite o CNAME do www para apontar para:
     SEU_USUARIO.github.io

7. Aguarde a propagação. Depois teste:
   https://arquitetorenan.com
   https://www.arquitetorenan.com

8. Quando o GitHub liberar, marque a opção Enforce HTTPS.
