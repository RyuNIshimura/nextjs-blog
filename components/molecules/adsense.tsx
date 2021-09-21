import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function Adsense() {
  const { asPath } = useRouter();

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div key={asPath}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center' }}
        data-ad-format="auto"
        data-full-width-responsive="true"
        data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID}
        data-ad-slot={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_SQUARE_SLOT}
      />
    </div>
  );
}
