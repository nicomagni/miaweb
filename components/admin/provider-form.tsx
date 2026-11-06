"use client";

import { startTransition, useActionState, type ReactNode } from "react";
import type { ProviderActionState } from "@/lib/validations/provider";

type ProviderFormProps = {
  action: (state: ProviderActionState, data: FormData) => Promise<ProviderActionState>;
  children: ReactNode;
  className?: string;
  confirmDelete?: boolean;
};

export function ProviderForm({ action, children, className, confirmDelete }: ProviderFormProps) {
  const [state, formAction, pending] = useActionState(action, {});
  return (
    <form
      aria-busy={pending}
      onSubmit={(event) => {
        event.preventDefault();
        if (
          confirmDelete &&
          !window.confirm("¿Eliminar este proveedor? Esta acción no se puede deshacer.")
        )
          return;
        const data = new FormData(event.currentTarget);
        startTransition(() => formAction(data));
      }}
    >
      {state.error ? (
        <div role="alert">
          <p>{state.error}</p>
          {state.issues ? (
            <ul>
              {state.issues.map((issue) => (
                <li key={issue}>{issue}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}
      {state.success ? <p role="status">{state.success}</p> : null}
      <fieldset
        disabled={pending}
        className={className}
        style={{ border: 0, padding: 0, margin: 0, minWidth: 0 }}
      >
        {children}
      </fieldset>
      {pending ? <p role="status">Procesando...</p> : null}
    </form>
  );
}
