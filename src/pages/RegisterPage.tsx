import { useState, useEffect } from 'react';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { app } from '../firebase';

const auth = getAuth(app);

const RegisterPage = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<any>(null);
  const [step, setStep] = useState<'enterPhone' | 'enterOtp'>('enterPhone');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
        callback: () => {},
      });
    }
  }, []);

  const sendOtp = async () => {
    try {
      const appVerifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, '+91' + phone, appVerifier);
      setConfirmationResult(result);
      setStep('enterOtp');
    } catch (err) {
      console.error(err);
      setError('Failed to send OTP. Please try again.');
    }
  };

  const verifyOtp = async () => {
    try {
      await confirmationResult.confirm(otp);
      alert('Phone verified successfully! You are now logged in.');
      window.location.href = '/dashboard';
    } catch (err) {
      console.error(err);
      setError('Invalid OTP. Please try again.');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#dfe6e9',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2rem',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ marginBottom: '1rem', color: '#2d3436' }}>📲 Register with Mobile</h2>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {step === 'enterPhone' && (
          <>
            <input
              type="tel"
              placeholder="Enter 10-digit phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                padding: '0.75rem',
                width: '100%',
                marginBottom: '1rem',
                borderRadius: '6px',
                border: '1px solid #ccc'
              }}
            />
            <div id="recaptcha-container"></div>
            <button onClick={sendOtp} style={{
              backgroundColor: '#00b894',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              cursor: 'pointer'
            }}>
              Send OTP
            </button>
          </>
        )}

        {step === 'enterOtp' && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              style={{
                padding: '0.75rem',
                width: '100%',
                marginBottom: '1rem',
                borderRadius: '6px',
                border: '1px solid #ccc'
              }}
            />
            <button onClick={verifyOtp} style={{
              backgroundColor: '#0984e3',
              color: '#fff',
              border: 'none',
              borderRadius: '6px',
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              cursor: 'pointer'
            }}>
              Verify & Register
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
