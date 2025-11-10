import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Layout, Header, Sider, Content, Footer } from './Layout';

describe('Layout', () => {
  describe('Layout component', () => {
    it('renders children correctly', () => {
      render(
        <Layout>
          <div>Layout Content</div>
        </Layout>
      );

      expect(screen.getByText('Layout Content')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Layout>Content</Layout>);
      const layout = screen.getByText('Content');

      expect(layout).toHaveClass('layout');
      expect(layout?.tagName).toBe('DIV');
    });

    it('applies hasSider class when hasSider is true', () => {
      render(<Layout hasSider>Content</Layout>);
      const layout = screen.getByText('Content');

      expect(layout).toHaveClass('layout');
      expect(layout).toHaveClass('layout--has-sider');
    });

    it('renders with different HTML tags', () => {
      render(<Layout as="section">Content</Layout>);
      const layout = screen.getByText('Content');

      expect(layout?.tagName).toBe('SECTION');
    });

    it('applies custom className', () => {
      render(<Layout className="custom-class">Content</Layout>);
      const layout = screen.getByText('Content');

      expect(layout).toHaveClass('layout');
      expect(layout).toHaveClass('custom-class');
    });
  });

  describe('Header component', () => {
    it('renders children correctly', () => {
      render(<Header>Header Content</Header>);

      expect(screen.getByText('Header Content')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Header>Content</Header>);
      const header = screen.getByText('Content');

      expect(header).toHaveClass('layout-header');
      expect(header?.tagName).toBe('HEADER');
    });

    it('renders with different HTML tags', () => {
      render(<Header as="div">Content</Header>);
      const header = screen.getByText('Content');

      expect(header?.tagName).toBe('DIV');
    });

    it('applies custom className', () => {
      render(<Header className="custom-header">Content</Header>);
      const header = screen.getByText('Content');

      expect(header).toHaveClass('layout-header');
      expect(header).toHaveClass('custom-header');
    });
  });

  describe('Sider component', () => {
    it('renders children correctly', () => {
      render(<Sider>Sider Content</Sider>);

      expect(screen.getByText('Sider Content')).toBeInTheDocument();
    });

    it('applies default classes and width', () => {
      render(<Sider>Content</Sider>);
      const sider = screen.getByText('Content');

      expect(sider).toHaveClass('layout-sider');
      expect(sider?.tagName).toBe('ASIDE');
      expect(sider).toHaveStyle({ width: '200px', flex: '0 0 200px' });
    });

    it('applies custom width', () => {
      render(<Sider width={300}>Content</Sider>);
      const sider = screen.getByText('Content');

      expect(sider).toHaveStyle({ width: '300px', flex: '0 0 300px' });
    });

    it('applies custom width as string', () => {
      render(<Sider width="25%">Content</Sider>);
      const sider = screen.getByText('Content');

      expect(sider).toHaveStyle({ width: '25%', flex: '0 0 25%' });
    });

    it('applies collapsible class when collapsible is true', () => {
      render(<Sider collapsible>Content</Sider>);
      const sider = screen.getByText('Content');

      expect(sider).toHaveClass('layout-sider--collapsible');
    });

    it('applies collapsed class and zero width when collapsed is true', () => {
      render(<Sider collapsed>Content</Sider>);
      const sider = screen.getByText('Content');

      expect(sider).toHaveClass('layout-sider--collapsed');
      expect(sider).toHaveStyle({ width: '0px', flex: '0 0 0px' });
    });

    it('renders trigger when provided', () => {
      render(<Sider trigger={<button>Toggle</button>}>Content</Sider>);

      expect(screen.getByText('Toggle')).toBeInTheDocument();
    });

    it('renders with different HTML tags', () => {
      render(<Sider as="div">Content</Sider>);
      const sider = screen.getByText('Content').parentElement;

      expect(sider?.tagName).toBe('DIV');
    });

    it('applies custom className', () => {
      render(<Sider className="custom-sider">Content</Sider>);
      const sider = screen.getByText('Content');

      expect(sider).toHaveClass('layout-sider');
      expect(sider).toHaveClass('custom-sider');
    });
  });

  describe('Content component', () => {
    it('renders children correctly', () => {
      render(<Content>Content Area</Content>);

      expect(screen.getByText('Content Area')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Content>Content</Content>);
      const content = screen.getByText('Content');

      expect(content).toHaveClass('layout-content');
      expect(content?.tagName).toBe('MAIN');
    });

    it('renders with different HTML tags', () => {
      render(<Content as="div">Content</Content>);
      const content = screen.getByText('Content');

      expect(content?.tagName).toBe('DIV');
    });

    it('applies custom className', () => {
      render(<Content className="custom-content">Content</Content>);
      const content = screen.getByText('Content');

      expect(content).toHaveClass('layout-content');
      expect(content).toHaveClass('custom-content');
    });
  });

  describe('Footer component', () => {
    it('renders children correctly', () => {
      render(<Footer>Footer Content</Footer>);

      expect(screen.getByText('Footer Content')).toBeInTheDocument();
    });

    it('applies default classes', () => {
      render(<Footer>Content</Footer>);
      const footer = screen.getByText('Content');

      expect(footer).toHaveClass('layout-footer');
      expect(footer?.tagName).toBe('FOOTER');
    });

    it('renders with different HTML tags', () => {
      render(<Footer as="div">Content</Footer>);
      const footer = screen.getByText('Content');

      expect(footer?.tagName).toBe('DIV');
    });

    it('applies custom className', () => {
      render(<Footer className="custom-footer">Content</Footer>);
      const footer = screen.getByText('Content');

      expect(footer).toHaveClass('layout-footer');
      expect(footer).toHaveClass('custom-footer');
    });
  });

  describe('layout combinations', () => {
    it('renders complete layout structure', () => {
      render(
        <Layout hasSider>
          <Header>Header</Header>
          <Layout>
            <Sider>Sider</Sider>
            <Content>Content</Content>
          </Layout>
          <Footer>Footer</Footer>
        </Layout>
      );

      expect(screen.getByText('Header')).toBeInTheDocument();
      expect(screen.getByText('Sider')).toBeInTheDocument();
      expect(screen.getByText('Content')).toBeInTheDocument();
      expect(screen.getByText('Footer')).toBeInTheDocument();
    });

    it('applies correct classes in nested layout', () => {
      render(
        <Layout hasSider>
          <Layout>
            <Sider>Sider</Sider>
            <Content>Content</Content>
          </Layout>
        </Layout>
      );

      const outerLayout = screen.getByText('Content').closest('.layout--has-sider');
      expect(outerLayout).toHaveClass('layout--has-sider');
    });
  });

  describe('accessibility', () => {
    it('supports semantic HTML structure', () => {
      render(
        <Layout>
          <Header>Header</Header>
          <Content>Content</Content>
          <Footer>Footer</Footer>
        </Layout>
      );

      const header = screen.getByText('Header');
      const content = screen.getByText('Content');
      const footer = screen.getByText('Footer');

      expect(header?.tagName).toBe('HEADER');
      expect(content?.tagName).toBe('MAIN');
      expect(footer?.tagName).toBe('FOOTER');
    });

    it('passes through other HTML attributes', () => {
      render(
        <Layout role="application" aria-label="Main layout">
          Content
        </Layout>
      );
      const layout = screen.getByText('Content');

      expect(layout).toHaveAttribute('role', 'application');
      expect(layout).toHaveAttribute('aria-label', 'Main layout');
    });
  });
});