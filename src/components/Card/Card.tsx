import { h, ComponentChildren, JSX } from 'preact';
import type { FunctionComponent } from 'preact';
import './Card.scss';

/**
 * Props for the Card component.
 * Provides a container with elevation and variant styling for content presentation.
 */
export interface CardProps extends JSX.HTMLAttributes<HTMLElement> {
  /**
   * Elevation level for shadow depth.
   * Higher values create more pronounced shadows.
   * @default 1
   */
  elevation?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24;
  /**
   * Visual variant of the card.
   * @default 'elevated'
   */
  variant?: 'elevated' | 'outlined';
  /**
   * Padding size for the card content.
   * Can be a predefined spacing key or a custom number (in pixels).
   * @default 'md'
   */
  padding?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | number;
  /**
   * HTML tag to use for the container element.
   * @default 'div'
   */
  as?: 'div' | 'article' | 'section' | 'header' | 'main' | 'aside' | 'footer';
}

/**
 * Card component for content containers with elevation and variants.
 * Similar to MUI Card/Paper or Antd Card components, provides consistent
 * elevation and border styling with theme integration.
 *
 * @param props - Component props
 * @returns JSX element with card styling
 *
 * @example
 * ```tsx
 * <Card elevation={4} variant="elevated" padding="md">
 *   <h2>Card Title</h2>
 *   <p>Card content goes here.</p>
 * </Card>
 * ```
 */
export const Card: FunctionComponent<CardProps> = ({
  elevation = 1,
  variant = 'elevated',
  padding = 'md',
  as: Tag = 'div',
  className,
  style,
  children,
  ...props
}: CardProps) => {
  // Map padding to CSS value
  const getPaddingValue = (padding: CardProps['padding']): string => {
    if (typeof padding === 'number') {
      return `${padding}px`;
    }
    switch (padding) {
      case 'xs':
        return 'var(--psc-spacing-xs)';
      case 'sm':
        return 'var(--psc-spacing-sm)';
      case 'md':
        return 'var(--psc-spacing-md)';
      case 'lg':
        return 'var(--psc-spacing-lg)';
      case 'xl':
        return 'var(--psc-spacing-xl)';
      case '2xl':
        return 'var(--psc-spacing-2xl)';
      case '3xl':
        return 'var(--psc-spacing-3xl)';
      case '4xl':
        return 'var(--psc-spacing-4xl)';
      case '5xl':
        return 'var(--psc-spacing-5xl)';
      case '6xl':
        return 'var(--psc-spacing-6xl)';
      default:
        return 'var(--psc-spacing-md)';
    }
  };

  const combinedClassName = [
    'card',
    `card--elevation-${elevation}`,
    `card--variant-${variant}`,
    className
  ].filter(Boolean).join(' ');

  const combinedStyle = {
    ...(typeof style === 'object' && style !== null ? style : {}),
    padding: getPaddingValue(padding)
  };

  return h(Tag, { className: combinedClassName, style: combinedStyle, ...props }, children);
};

export default Card;