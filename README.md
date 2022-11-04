# TODO List - Laravel + ReactJS
<p>A API foi construída em Laravel com a autenticação usando JWT via Sanctum.</p>
<p>Iniciei o desenvolvimento dividindo a API em etapas, ficando:</p>
<ul>
  <li>Migrations</li>
  <li>Models</li>
  <li>Seeders</li>
  <li>Routes</li>
  <li>Controllers</li>
  <li>Requests</li>
  <li>Unit Tests</li>
</ul>
<br>
<p>Depois iniciei o desenvolvimento do front começando pela autenticação e depois prosseguindo com as páginas do CRUD.</p>

# Passo a passo
## API
<p>1) Rode o comando <b>composer install</b></p>
<p>2) Rode o comando <b>cp .env.example .env</b></p>
<p>3) Crie um banco de dados e defina os dados no .env</p>
<p>4) Rode o comando <b>php artisan key:generate</b></p>
<p>5) Rode o comando <b>php artisan jwt:secret</b></p>
<p>6) Rode o comando <b>php artisan migrate --seed</b></p>
<p>7) Rode o comando <b>mkdir tests/Unit</b></p>
<p>8) Para rodar os testes execute <b>php artisan test --filter=UserTest</b>, depois <b>php artisan test</b></p>
<p>9) Por fim, execute <b>php artisan serve</b> para iniciar o servidor</p>
<p><b>Obs: Certifique-se que o projeto iniciou na porta 8000</b></p>

## WEB
<p>1) Rode o comando <b>yarn</b></p>
<p>2) Rode o comando <b>yarn dev</b></p>
<p>3) Para se cadastrar ou fazer login como usuário, acesse a rota <b>/login</b></p>
<p>3) Para fazer login como admin, acesse a rota <b>/admin/login</b></p>