'use client';

import Error from 'next/error';
import React from 'react';

export default () => (
  <html lang="en">
    <body>
      <Error statusCode={404} />
    </body>
  </html>
);