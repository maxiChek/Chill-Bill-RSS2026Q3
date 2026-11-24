export function createTextField(id: string, placeholder?: string) {
  const input = document.createElement('input');
  input.type = 'text';
  if (placeholder) input.placeholder = placeholder;
  input.id = id;
  return input;
}

export function createLabel(text: string, htmlFor: string) {
  const label = document.createElement('label');
  label.textContent = text;
  label.htmlFor = htmlFor;
  return label;
}
