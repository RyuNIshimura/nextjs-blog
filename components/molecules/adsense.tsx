import React, { useState, CSSProperties, useEffect } from 'react';

export type AdSenseProps = {
  styles?: CSSProperties;
  client: string;
  slot: string;
  format?: string;
  responsive?: string;
};

export default function AdSense({
  client,
  slot,
  format,
  responsive,
  styles,
}: AdSenseProps) {
  const [adSenseLoading, setAdSenseLoading] = useState(false);
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      setAdSenseLoading(true);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
      {adSenseLoading && (
        <div className="bg-gray-100 rounded-md">
          <ins
            className="adsbygoogle"
            style={styles}
            data-ad-format={format}
            data-full-width-responsive={responsive}
            data-ad-client={client}
            data-ad-slot={slot}
          />
        </div>
      )}
    </>
  );
}
