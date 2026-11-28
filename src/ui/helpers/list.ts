/** Appends `elements`, or a single empty-state message when there are none. */
export function appendOrEmpty(wrapper: Element, elements: Node[], emptyText: string): void {
  if (elements.length !== 0) {
    wrapper.append(...elements);
    return;
  }

  const emptyMessage = document.createElement('p');
  emptyMessage.textContent = emptyText;
  wrapper.append(emptyMessage);
}
