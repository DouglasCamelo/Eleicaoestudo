<?php
session_start();

// Verifica se o formulário de login foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Verifica se o nome de usuário e senha estão corretos
    $username = "Camelo";
    $password = "123456";

    // Verifica se o nome de usuário e a senha fornecidos correspondem aos valores esperados
    if ($_POST["username"] === $username && $_POST["password"] === $password) {
        // Autenticação bem-sucedida, redireciona para a página principal
        $_SESSION["loggedin"] = true;
        header("Location: index.html");
        exit();
    } else {
        // Credenciais incorretas, exibe uma mensagem de erro
        $error = "Nome de usuário ou senha incorretos.";
    }
}
?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="login-container">
        <h2>Área de Login</h2>
        <?php if (isset($error)) : ?>
            <p><?php echo $error; ?></p>
        <?php endif; ?>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <input type="text" name="username" placeholder="Nome de Usuário" required>
            <input type="password" name="password" placeholder="Senha" required>
            <button type="submit">Entrar</button>
        </form>
    </div>
</body>
</html>
