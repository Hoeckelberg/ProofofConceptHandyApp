using System.Security.Cryptography.X509Certificates;

namespace POC_API
{
    public class CertificateValidation
    {
      //  "7ED035ABAB1B8CCDFF561935D3C55BE91EAB3DFB",
        
        internal bool ValidateCertificate(X509Certificate2 clientCertificate)
        {
            string[] allowedThumbprints = {
                "d755be597e353b8b97a72b9f5cdbe85a27edf698"
            };
            if (allowedThumbprints.Contains(clientCertificate.Thumbprint))
            {
                return true;
            }
            return false;
        }
    }
}
