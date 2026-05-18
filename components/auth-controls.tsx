import { Show, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export function AuthControls() {
  return (
    <div className="auth-controls" aria-label="Controles de autenticación">
      <Show when="signed-out">
        <div className="auth-controls__actions">
          <SignInButton>
            <button className="auth-controls__button auth-controls__button--ghost" type="button">
              Ingresar
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="auth-controls__button auth-controls__button--primary" type="button">
              Crear cuenta
            </button>
          </SignUpButton>
        </div>
      </Show>
      <Show when="signed-in">
        <div className="auth-controls__user">
          <span className="auth-controls__label">Admin</span>
          <UserButton />
        </div>
      </Show>
    </div>
  );
}
