import { useSignal } from '@preact/signals';
import './ExampleComponent.scss';

/**
 * Props for the ExampleComponent.
 */
interface ExampleComponentProps {
  message?: string;
}

/**
 * Example component demonstrating Preact Signals usage.
 * Shows reactive state management with click counter and message updates.
 * Uses semantic HTML5 elements and BEM CSS methodology.
 *
 * @param props - Component props
 * @param props.message - Optional custom message to display instead of reactive signal
 * @returns JSX element with interactive example
 *
 * @example
 * ```tsx
 * import ExampleComponent from './components/ExampleComponent/ExampleComponent';
 *
 * function App() {
 *   return (
 *     <ExampleComponent message="Custom message" />
 *   );
 * }
 * ```
 */
const ExampleComponent = ({ message }: ExampleComponentProps) => {
  // Reaktywny stan używając signals - każdy komponent ma własny stan
  const messageSignal = useSignal('Witaj w bibliotece komponentów!');
  const clickCount = useSignal(0);

  /**
   * Handles click events for the primary button.
   * Increments click count and updates the message signal.
   */
  const handleClick = () => {
    clickCount.value += 1;
    messageSignal.value = `Kliknięto ${clickCount.value} ${clickCount.value === 1 ? 'raz' : clickCount.value < 5 ? 'razy' : 'razy'}!`;
  };

  /**
   * Handles reset events for the secondary button.
   * Resets click count and message signal to initial values.
   */
  const handleReset = () => {
    clickCount.value = 0;
    messageSignal.value = 'Witaj w bibliotece komponentów!';
  };

  // Jeśli przekazano props, użyj go, w przeciwnym razie użyj signal

  return (
    <article className="example-component">
      <h1 className="example-component__title">{message || messageSignal}</h1>
      <div className="example-component__actions">
        <button
          type={'button'}
          className="example-component__button example-component__button--primary"
          onClick={handleClick}
        >
          Kliknij mnie ({clickCount.value})
        </button>
        <button
          type={'button'}
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