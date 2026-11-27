import { createLabel, createTextField } from './fields';

export type DialogAction = {
  /** Button label. */
  label: string;
  /** Value the dialog resolves with when this action is chosen. Must be non-empty. */
  value: string;
  /** Primary actions are emphasized and submit on Enter. */
  primary?: boolean;
  /** Return false to keep the dialog open (e.g. failed validation). */
  onClick?: () => boolean | void;
};

export type DialogOptions = {
  title: string;
  /** Body content, built by the caller (e.g. with the field helpers). */
  content?: Node;
  actions: DialogAction[];
};

/**
 * Opens a modal dialog and resolves with the value of the chosen action,
 * or null if it was dismissed (Esc or a click on the backdrop).
 */
export function openDialog({ title, content, actions }: DialogOptions): Promise<string | null> {
  const dialog = document.createElement('dialog');
  dialog.className = 'dialog';

  const form = document.createElement('form');
  form.method = 'dialog';
  form.className = 'dialog-form';

  const heading = document.createElement('h2');
  heading.className = 'dialog-title';
  heading.textContent = title;

  const body = document.createElement('div');
  body.className = 'dialog-body';
  if (content) body.append(content);

  const actionsWrapper = document.createElement('div');
  actionsWrapper.className = 'dialog-actions';

  for (const action of actions) {
    const button = document.createElement('button');
    button.type = action.primary ? 'submit' : 'button';
    button.value = action.value;
    button.textContent = action.label;
    button.className = action.primary ? 'dialog-action dialog-action--primary' : 'dialog-action';

    button.addEventListener('click', (event) => {
      if (action.onClick && action.onClick() === false) {
        event.preventDefault();
        return;
      }
      // Submit buttons close the dialog via the form's `method="dialog"`.
      if (button.type !== 'submit') dialog.close(action.value);
    });

    actionsWrapper.append(button);
  }

  form.append(heading, body, actionsWrapper);
  dialog.append(form);

  return new Promise<string | null>((resolve) => {
    dialog.addEventListener('close', () => {
      resolve(dialog.returnValue || null);
      dialog.remove();
    });

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });

    document.body.append(dialog);
    dialog.showModal();
  });
}

export type AlertDialogOptions = {
  title: string;
  text?: string;
  submitLabel?: string;
};

/** Alert dialog — a drop-in replacement for window.alert. */
export async function openAlertDialog({
  title,
  text,
  submitLabel = 'Понятно',
}: AlertDialogOptions): Promise<void> {
  const content = document.createElement('p');
  content.className = 'dialog-content';
  if (text) content.textContent = text;

  await openDialog({
    title,
    content,
    actions: [{ label: submitLabel, value: 'submit', primary: true }],
  });
}

export type ConfirmDialogOptions = {
  title: string;
  text?: string;
  submitLabel?: string;
  cancelLabel?: string;
};

/**
 * Confirm dialog — a drop-in replacement for window.confirm.
 * Resolves with true if the user clicked the submit button, false otherwise.
 */
export async function openConfirmDialog({
  title,
  text,
  submitLabel = 'OK',
  cancelLabel = 'Отмена',
}: ConfirmDialogOptions): Promise<boolean> {
  let contentEl: HTMLParagraphElement | undefined;

  if (text) {
    contentEl = document.createElement('p');
    contentEl.className = 'dialog-content';
    contentEl.textContent = text;
  }

  const result = await openDialog({
    title,
    content: contentEl,
    actions: [
      {
        label: submitLabel,
        value: 'submit',
        primary: true,
      },
      { label: cancelLabel, value: 'cancel' },
    ],
  });

  return result === 'submit';
}

export type TextDialogOptions = {
  title: string;
  label: string;
  value?: string;
  placeholder?: string;
  submitLabel?: string;
  cancelLabel?: string;
  /** Return false to keep the dialog open. */
  validate?: (value: string) => boolean;
  /** Message shown when validation fails. Defaults to 'Заполните поле'. */
  errorMessage?: string;
};

/**
 * Single text-field dialog — a drop-in replacement for window.prompt.
 * Resolves with the trimmed value, or null if cancelled/dismissed.
 */
export async function openTextDialog({
  title,
  label,
  value = '',
  placeholder,
  submitLabel = 'Сохранить',
  cancelLabel = 'Отмена',
  validate,
  errorMessage,
}: TextDialogOptions): Promise<string | null> {
  const inputId = `dialog-input-${crypto.randomUUID()}`;
  const input = createTextField(inputId, placeholder);
  input.value = value;
  input.autofocus = true;

  const field = document.createElement('div');
  field.className = 'dialog-field';
  field.append(createLabel(label, inputId), input);

  const result = await openDialog({
    title,
    content: field,
    actions: [
      {
        label: submitLabel,
        value: 'submit',
        primary: true,
        onClick: () => {
          const trimmed = input.value.trim();
          if (trimmed === '' || (validate && !validate(trimmed))) {
            input.setCustomValidity(errorMessage ?? 'Заполните поле');
            input.reportValidity();
            return false;
          }
          input.setCustomValidity('');
          return true;
        },
      },
      { label: cancelLabel, value: 'cancel' },
    ],
  });

  if (result !== 'submit') return null;
  return input.value.trim();
}
