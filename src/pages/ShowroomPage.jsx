import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button, Card, Input, CodeBlock } from '../components/ui';
import './ShowroomPage.css';

// Icons
import { FiInfo, FiCode, FiEye } from 'react-icons/fi';

const ShowroomPage = () => {
  const { t } = useTranslation();
  
  const [activeTab, setActiveTab] = useState('overview');
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="showroom-container">
      <motion.section 
        className="showroom-hero"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {t('showroomTitle')}
          </motion.h1>
          <motion.p 
            className="subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {t('showroomSubtitle')}
          </motion.p>
          <motion.div
            className="tabs"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <button 
              className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <FiEye /> Overview
            </button>
            <button 
              className={`tab ${activeTab === 'components' ? 'active' : ''}`}
              onClick={() => setActiveTab('components')}
            >
              <FiCode /> Components
            </button>
            <button 
              className={`tab ${activeTab === 'usage' ? 'active' : ''}`}
              onClick={() => setActiveTab('usage')}
            >
              <FiInfo /> How to Use
            </button>
          </motion.div>
        </div>
      </motion.section>
      
      <motion.section
        className="showroom-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="container">
          {activeTab === 'overview' && (
            <motion.div className="overview-tab" variants={containerVariants}>
              <motion.h2 variants={itemVariants}>Aurora Theme</motion.h2>
              <motion.p variants={itemVariants} className="theme-description">
                A vibrant, ethereal theme inspired by the aurora borealis, featuring smooth gradients and 
                elegant components that bring your UI to life with magical transitions and visual effects.
              </motion.p>
              
              <motion.div className="theme-preview" variants={itemVariants}>
                <h3>Color Palette</h3>
                <div className="color-palette">
                  <div className="color-swatch primary-swatch">
                    <span>Primary</span>
                  </div>
                  <div className="color-swatch secondary-swatch">
                    <span>Secondary</span>
                  </div>
                  <div className="color-swatch accent-swatch">
                    <span>Accent</span>
                  </div>
                  <div className="color-swatch surface-swatch">
                    <span>Surface</span>
                  </div>
                  <div className="color-swatch text-swatch">
                    <span>Text</span>
                  </div>
                </div>
              </motion.div>
              
              <motion.div className="theme-features" variants={itemVariants}>
                <h3>Key Features</h3>
                <ul className="feature-list">
                  <li>Ethereal gradient effects inspired by aurora borealis</li>
                  <li>Responsive, mobile-first design system</li>
                  <li>RTL support for Arabic language</li>
                  <li>Dark and light mode with seamless transitions</li>
                  <li>Typography optimized for each language</li>
                  <li>Animation-enhanced components for delightful interactions</li>
                </ul>
              </motion.div>
              
              <motion.div variants={itemVariants} className="cta-section">
                <Button variant="primary" size="large">
                  Explore Components
                </Button>
                <Button variant="secondary" size="large">
                  <Link to="/how-to-use">How to Use This Theme</Link>
                </Button>
              </motion.div>
            </motion.div>
          )}
          
          {activeTab === 'components' && (
            <motion.div className="components-tab" variants={containerVariants}>
              <motion.h2 variants={itemVariants}>UI Components</motion.h2>
              
              <motion.div variants={itemVariants} className="component-section">
                <h3>Buttons</h3>
                <div className="component-demo">
                  <Button variant="primary" size="small">Small Button</Button>
                  <Button variant="primary" size="medium">Medium Button</Button>
                  <Button variant="primary" size="large">Large Button</Button>
                  <Button variant="secondary" size="medium">Secondary</Button>
                  <Button variant="outline" size="medium">Outline</Button>
                  <Button variant="text" size="medium">Text Button</Button>
                  <Button variant="primary" size="medium" disabled>Disabled</Button>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="component-section">
                <h3>Cards</h3>
                <div className="cards-demo">
                  <Card className="demo-card">
                    <h4>Basic Card</h4>
                    <p>A simple card component with clean styling and subtle hover effects.</p>
                  </Card>
                  
                  <Card className="demo-card" elevation="medium">
                    <h4>Medium Elevation</h4>
                    <p>Card with medium elevation for slightly more prominence.</p>
                  </Card>
                  
                  <Card className="demo-card" elevation="high">
                    <h4>High Elevation</h4>
                    <p>Card with high elevation for maximum prominence.</p>
                    <Button variant="primary" size="small">Action</Button>
                  </Card>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="component-section">
                <h3>Form Elements</h3>
                <div className="form-elements-demo">
                  <Input
                    type="text"
                    label="Username"
                    placeholder="Enter your username"
                  />
                  
                  <Input
                    type="password"
                    label="Password"
                    placeholder="Enter your password"
                  />
                  
                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email"
                    helperText="We'll never share your email with anyone else."
                  />
                  
                  <Input
                    type="text"
                    label="Disabled Input"
                    placeholder="This input is disabled"
                    disabled
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {activeTab === 'usage' && (
            <motion.div className="usage-tab" variants={containerVariants}>
              <motion.h2 variants={itemVariants}>How to Use This Theme</motion.h2>              <motion.div variants={itemVariants} className="usage-section">
                <h3>Button Component</h3>
                <div className="usage-demo">
                  <div className="code-preview">
                    <CodeBlock code={`import { Button } from '../components/ui';

// In your component:
<Button 
  variant="primary" 
  size="medium" 
  onClick={() => console.log('Button clicked!')}
>
  Click Me
</Button>`} language="jsx" />
                  </div>
                  <div className="component-preview">
                    <h4>Renders as:</h4>
                    <Button 
                      variant="primary" 
                      size="medium" 
                      onClick={() => console.log('Button clicked!')}
                    >
                      Click Me
                    </Button>
                  </div>
                </div>
              </motion.div>
                <motion.div variants={itemVariants} className="usage-section">
                <h3>Card Component</h3>
                <div className="usage-demo">
                  <div className="code-preview">
                    <CodeBlock code={`import { Card, Button } from '../components/ui';

// In your component:
<Card elevation="medium">
  <h3>Card Title</h3>
  <p>This is a card with medium elevation that contains content and an action button.</p>
  <Button variant="primary" size="small">
    Learn More
  </Button>
</Card>`} language="jsx" />
                  </div>
                  <div className="component-preview">
                    <h4>Renders as:</h4>
                    <Card elevation="medium" style={{ maxWidth: '350px' }}>
                      <h3>Card Title</h3>
                      <p>This is a card with medium elevation that contains content and an action button.</p>
                      <div style={{ marginTop: '1rem' }}>
                        <Button variant="primary" size="small">
                          Learn More
                        </Button>
                      </div>
                    </Card>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="usage-section">
                <h3>Input Component</h3>
                <div className="usage-demo">
                  <div className="code-preview">
                    <CodeBlock code={`import { Input } from '../components/ui';

// In your component:
<Input
  type="email"
  label="Email Address"
  placeholder="Enter your email"
  helperText="We'll never share your email with anyone else."
/>`} language="jsx" />
                  </div>
                  <div className="component-preview">
                    <h4>Renders as:</h4>
                    <Input
                      type="email"
                      label="Email Address"
                      placeholder="Enter your email"
                      helperText="We'll never share your email with anyone else."
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="usage-section">
                <h3>Card Component</h3>
                <div className="usage-demo">
                  <div className="code-preview">
                    <pre><code>{`import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

// In your component:
<Card elevation="medium">
  <h3>Card Title</h3>
  <p>This is some content in the card.</p>
  <Button variant="primary">Action Button</Button>
</Card>`}</code></pre>
                  </div>
                  <div className="component-preview">
                    <h4>Renders as:</h4>
                    <Card elevation="medium">
                      <h3>Card Title</h3>
                      <p>This is some content in the card.</p>
                      <Button variant="primary" size="small">Action Button</Button>
                    </Card>
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="usage-section">
                <h3>Input Component</h3>
                <div className="usage-demo">
                  <div className="code-preview">
                    <pre><code>{`import { Input } from '../components/ui/Input';

// In your component:
<Input
  type="text"
  label="Username"
  placeholder="Enter your username"
  onChange={(e) => setUsername(e.target.value)}
  helperText="Choose a unique username"
/>`}</code></pre>
                  </div>
                  <div className="component-preview">
                    <h4>Renders as:</h4>
                    <Input
                      type="text"
                      label="Username"
                      placeholder="Enter your username"
                      helperText="Choose a unique username"
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="next-steps">
                <h3>Next Steps</h3>
                <p>
                  For more components and detailed usage information, check out the project documentation.
                  You can also visit the Control Center to try different themes, languages, and modes.
                </p>
                <div className="cta-buttons">
                  <Button variant="primary" size="medium">
                    <Link to="/control-center">Visit Control Center</Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default ShowroomPage;
