// pages/index.tsx
import { useState, useRef } from 'react';
import { QRCode } from 'react-qr-code';
import { toPng } from 'html-to-image';

export default function PassGenerator() {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [generated, setGenerated] = useState(false);
  const passRef = useRef<HTMLDivElement>(null);

  // School theme colors
  const schoolColors = {
    primary: '#1a4b8c',  // Dark blue
    secondary: '#f9a51a', // Gold
    accent: '#e74c3c',   // Red
    light: '#ecf0f1',    // Light gray
    dark: '#2c3e50'      // Dark blue-black
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePass = () => {
    if (name.trim() && nickname.trim()) {
      setGenerated(true);
    }
  };

  const downloadPass = async () => {
    if (passRef.current) {
      try {
        // Increase quality for download
        const dataUrl = await toPng(passRef.current, {
          quality: 1,
          pixelRatio: 3 // Higher resolution
        });
        
        const link = document.createElement('a');
        link.download = `ShahraB-Pass-${name.replace(/\s+/g, '-')}.png`;
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.error('Error generating pass:', error);
      }
    }
  };

  const resetForm = () => {
    setName('');
    setNickname('');
    setImage(null);
    setGenerated(false);
  };

  return (
    <div style={{
      maxWidth: '1000px',
      margin: '0 auto',
      padding: '20px',
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      background: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <h1 style={{
        textAlign: 'center',
        color: schoolColors.primary,
        marginBottom: '30px',
        fontSize: '2.5rem',
        textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
      }}>
        ShahraB International School
        <br />
        <span style={{ 
          color: schoolColors.secondary,
          fontSize: '1.8rem',
          display: 'block',
          marginTop: '5px'
        }}>
          Classmates GetTogether Pass
        </span>
      </h1>
      
      {!generated ? (
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <h2 style={{
            color: schoolColors.primary,
            textAlign: 'center',
            marginBottom: '25px',
            borderBottom: `2px solid ${schoolColors.secondary}`,
            paddingBottom: '10px'
          }}>
            Create Your Pass
          </h2>
          
          <div style={{ display: 'grid', gap: '20px' }}>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: schoolColors.dark,
                fontWeight: '500'
              }}>Full Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: `1px solid ${schoolColors.primary}`,
                  borderRadius: '8px'
                }}
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: schoolColors.dark,
                fontWeight: '500'
              }}>Nickname:</label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  fontSize: '16px',
                  border: `1px solid ${schoolColors.primary}`,
                  borderRadius: '8px'
                }}
                required
              />
            </div>

            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: schoolColors.dark,
                fontWeight: '500'
              }}>Upload Photo:</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                style={{ width: '100%' }}
              />
              {image && (
                <div style={{
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  marginTop: '10px',
                  border: `3px solid ${schoolColors.secondary}`
                }}>
                  <img 
                    src={image} 
                    alt="Preview" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
              )}
            </div>

            <button
              onClick={generatePass}
              style={{
                padding: '15px',
                background: schoolColors.primary,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: '600',
                marginTop: '10px',
                transition: 'all 0.3s',
                ':hover': {
                  background: schoolColors.dark,
                  transform: 'translateY(-2px)'
                }
              }}
              disabled={!name || !nickname}
            >
              Generate My Pass
            </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          {/* The Pass Card */}
          <div ref={passRef} style={{
            background: `linear-gradient(135deg, ${schoolColors.primary} 0%, ${schoolColors.dark} 100%)`,
            padding: '25px',
            borderRadius: '20px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
            maxWidth: '500px',
            margin: '0 auto 40px',
            position: 'relative',
            overflow: 'hidden',
            color: 'white',
            textAlign: 'center'
          }}>
            {/* Decorative elements */}
            <div style={{
              position: 'absolute',
              top: '-50px',
              right: '-50px',
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)'
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '-30px',
              left: '-30px',
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.05)'
            }}></div>
            
            {/* School logo/header */}
            <div style={{
              marginBottom: '20px',
              borderBottom: `2px solid ${schoolColors.secondary}`,
              paddingBottom: '15px'
            }}>
              <h2 style={{
                margin: '0',
                fontSize: '24px',
                fontWeight: '700',
                letterSpacing: '1px'
              }}>SHAHRAB INTERNATIONAL SCHOOL</h2>
              <p style={{
                margin: '5px 0 0',
                fontSize: '16px',
                color: schoolColors.secondary
              }}>Classmates GetTogether 2024</p>
            </div>
            
            {/* Attendee photo */}
            {image && (
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                overflow: 'hidden',
                margin: '0 auto 15px',
                border: `4px solid ${schoolColors.secondary}`,
                boxShadow: '0 4px 10px rgba(0,0,0,0.2)',
                position: 'relative',
                zIndex: '1'
              }}>
                <img 
                  src={image} 
                  alt="Attendee" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>
            )}
            
            {/* Attendee details */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              padding: '15px',
              borderRadius: '10px',
              margin: '15px 0',
              backdropFilter: 'blur(5px)',
              border: `1px solid rgba(255,255,255,0.2)`
            }}>
              <h3 style={{
                margin: '0 0 5px',
                fontSize: '22px',
                fontWeight: '600'
              }}>{name.toUpperCase()}</h3>
              <p style={{
                margin: '0',
                fontStyle: 'italic',
                color: schoolColors.secondary,
                fontSize: '18px'
              }}>"{nickname}"</p>
            </div>
            
            {/* QR Code */}
            <div style={{
              background: 'white',
              padding: '10px',
              borderRadius: '10px',
              display: 'inline-block',
              margin: '15px 0'
            }}>
              <QRCode 
                value={`ShahraB-${name}-${nickname}-${Date.now()}`} 
                size={140}
                level="H"
                fgColor={schoolColors.primary}
              />
            </div>
            
            {/* Footer */}
            <div style={{
              marginTop: '15px',
              fontSize: '12px',
              color: 'rgba(255,255,255,0.7)',
              display: 'flex',
              justifyContent: 'space-between'
            }}>
              <span>#{Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
              <span>Valid for entry</span>
            </div>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button
              onClick={downloadPass}
              style={{
                padding: '15px 30px',
                background: schoolColors.primary,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: '600',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s',
                ':hover': {
                  background: schoolColors.dark,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
                }
              }}
            >
              Download High-Quality Pass
            </button>
            
            <button
              onClick={resetForm}
              style={{
                padding: '15px 30px',
                background: schoolColors.accent,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '18px',
                fontWeight: '600',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                transition: 'all 0.3s',
                ':hover': {
                  background: '#c0392b',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
                }
              }}
            >
              Create Another Pass
            </button>
          </div>
        </div>
      )}
    </div>
  );
}