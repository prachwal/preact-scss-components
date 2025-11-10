import type { Meta, StoryObj } from '@storybook/preact';
import { useState } from 'preact/hooks';
import { Layout, Header, Sider, Content, Footer, LayoutProps } from './Layout';

const meta: Meta = {
  title: 'Layout/Layout',
  component: Layout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Structural layout components for organizing page content with header, sidebar, content, and footer sections.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<LayoutProps>;

// Basic layout structure
export const Basic: Story = {
  render: (args) => (
    <Layout {...args}>
      <Header>
        <h1 style={{ margin: 0, color: 'var(--psc-color-text-primary)' }}>Header</h1>
      </Header>
      <Content>
        <div style={{ padding: '20px', background: 'var(--psc-color-surface-secondary)', minHeight: '200px' }}>
          <h2>Main Content</h2>
          <p>This is the main content area of the page.</p>
        </div>
      </Content>
      <Footer>
        <p style={{ margin: 0, textAlign: 'center' }}>Footer Content</p>
      </Footer>
    </Layout>
  ),
};

// Layout with sidebar
export const WithSidebar: Story = {
  render: () => (
    <Layout hasSider>
      <Header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ margin: 0, color: 'var(--psc-color-text-primary)' }}>Dashboard</h1>
          <nav>
            <a href="#" style={{ color: 'var(--psc-color-text-primary)', marginLeft: '20px' }}>Profile</a>
            <a href="#" style={{ color: 'var(--psc-color-text-primary)', marginLeft: '20px' }}>Settings</a>
          </nav>
        </div>
      </Header>
      <Layout>
        <Sider width={250}>
          <div style={{ padding: '20px' }}>
            <h3 style={{ marginTop: 0 }}>Navigation</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'var(--psc-color-text-primary)' }}>Dashboard</a></li>
              <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'var(--psc-color-text-primary)' }}>Analytics</a></li>
              <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'var(--psc-color-text-primary)' }}>Users</a></li>
              <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'var(--psc-color-text-primary)' }}>Settings</a></li>
            </ul>
          </div>
        </Sider>
        <Content>
          <div style={{ padding: '20px' }}>
            <h2>Dashboard Content</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div style={{ padding: '20px', background: 'var(--psc-color-surface-secondary)', borderRadius: '8px' }}>
                <h3>Card 1</h3>
                <p>Some content here</p>
              </div>
              <div style={{ padding: '20px', background: 'var(--psc-color-surface-secondary)', borderRadius: '8px' }}>
                <h3>Card 2</h3>
                <p>Some content here</p>
              </div>
              <div style={{ padding: '20px', background: 'var(--psc-color-surface-secondary)', borderRadius: '8px' }}>
                <h3>Card 3</h3>
                <p>Some content here</p>
              </div>
            </div>
          </div>
        </Content>
      </Layout>
      <Footer>
        <p style={{ margin: 0, textAlign: 'center' }}>© 2024 Dashboard App</p>
      </Footer>
    </Layout>
  ),
};

// Collapsible sidebar
export const CollapsibleSidebar: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
      <Layout hasSider>
        <Header>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ margin: 0, color: 'var(--psc-color-text-primary)' }}>Collapsible Sidebar</h1>
            <button
              onClick={() => setCollapsed(!collapsed)}
              style={{ background: 'white', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}
            >
              {collapsed ? 'Expand' : 'Collapse'}
            </button>
          </div>
        </Header>
        <Layout>
          <Sider width={250} collapsed={collapsed} collapsible>
            {!collapsed && (
              <div style={{ padding: '20px' }}>
                <h3 style={{ marginTop: 0 }}>Menu</h3>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'var(--psc-color-text-primary)' }}>Home</a></li>
                  <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'var(--psc-color-text-primary)' }}>About</a></li>
                  <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'var(--psc-color-text-primary)' }}>Contact</a></li>
                </ul>
              </div>
            )}
          </Sider>
          <Content>
            <div style={{ padding: '20px' }}>
              <h2>Content Area</h2>
              <p>The sidebar can be collapsed and expanded.</p>
              <p>Current state: {collapsed ? 'Collapsed' : 'Expanded'}</p>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  },
};

// Different layout configurations
export const LayoutConfigurations: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: '600px' }}>
      {/* Top Header + Content + Footer */}
      <div>
        <h3>Header + Content + Footer</h3>
        <Layout style={{ height: '400px', border: '1px solid var(--psc-color-border)' }}>
          <Header style={{ background: 'var(--psc-color-primary)', color: 'var(--psc-color-text-primary)', padding: '0 var(--psc-spacing-md)', display: 'flex', alignItems: 'center' }}>
            Header
          </Header>
          <Content style={{ background: 'var(--psc-color-surface-secondary)', padding: 'var(--psc-spacing-md)' }}>
            Content
          </Content>
          <Footer style={{ background: 'var(--psc-color-surface-secondary)', padding: 'var(--psc-spacing-md)', textAlign: 'center' }}>
            Footer
          </Footer>
        </Layout>
      </div>

      {/* Header + Sider + Content */}
      <div>
        <h3>Header + Sider + Content</h3>
        <Layout hasSider style={{ height: '400px', border: '1px solid var(--psc-color-border)' }}>
          <Header style={{ background: 'var(--psc-color-primary)', color: 'var(--psc-color-text-primary)', padding: '0 var(--psc-spacing-md)', display: 'flex', alignItems: 'center' }}>
            Header
          </Header>
          <Layout>
            <Sider width={120} style={{ background: 'var(--psc-color-surface-tertiary)', color: 'var(--psc-color-text-primary)', padding: 'var(--psc-spacing-md)' }}>
              Sider
            </Sider>
            <Content style={{ background: 'var(--psc-color-surface-secondary)', padding: 'var(--psc-spacing-md)' }}>
              Content
            </Content>
          </Layout>
        </Layout>
      </div>
    </div>
  ),
};

// Responsive layout
export const ResponsiveLayout: Story = {
  render: () => (
    <Layout hasSider>
      <Header style={{ background: 'var(--psc-color-primary)', color: 'var(--psc-color-text-primary)', padding: '0 var(--psc-spacing-md)', display: 'flex', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>Responsive Layout</h2>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: 'var(--psc-color-surface-tertiary)', color: 'var(--psc-color-text-primary)', padding: 'var(--psc-spacing-md)' }}>
          <h3>Sidebar</h3>
          <p>This sidebar will move below content on mobile devices.</p>
        </Sider>
        <Content style={{ background: 'var(--psc-color-surface-secondary)', padding: 'var(--psc-spacing-md)' }}>
          <h2>Main Content</h2>
          <p>Resize the browser window to see the responsive behavior.</p>
          <p>On mobile devices, the sidebar appears below the content.</p>
        </Content>
      </Layout>
      <Footer style={{ background: 'var(--psc-color-surface-secondary)', padding: 'var(--psc-spacing-md)', textAlign: 'center' }}>
        Responsive Footer
      </Footer>
    </Layout>
  ),
};