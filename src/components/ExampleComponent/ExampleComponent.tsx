import { h } from 'preact';
import { signal } from '@preact/signals';
import './ExampleComponent.scss';

// Reaktywny stan używając signals
const messageSignal = signal('Witaj w bibliotece komponentów!');
const clickCount = signal(0);

interface ExampleComponentProps {
  message?: string;
}

export const handleClick = () => {
  clickCount.value += 1;
  messageSignal.value = `Kliknięto ${clickCount.value} ${clickCount.value === 1 ? 'raz' : clickCount.value < 5 ? 'razy' : 'razy'}!`;
};

export const handleReset = () => {
  clickCount.value = 0;
  messageSignal.value = 'Witaj w bibliotece komponentów!';
};

const ExampleComponent = ({ message }: ExampleComponentProps) => {
  // Jeśli przekazano props, użyj go, w przeciwnym razie użyj signal
  const displayMessage = message || messageSignal.value;

  return (
    <article className="example-component">
      <h1 className="example-component__title">{displayMessage}</h1>
      <div className="example-component__actions">
        <button
          className="example-component__button example-component__button--primary"
          onClick={handleClick}
        >
          Kliknij mnie ({clickCount.value})
        </button>
        <button
          className="example-component__button example-component__button--secondary"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <p className="example-component__description">
        Ten komponent używa <strong>Preact Signals</strong> do reaktywnego zarządzania stanem.
        Signals automatycznie aktualizują UI gdy wartość się zmieni!
      </p>
    </article>
  );
};

export default ExampleComponent;