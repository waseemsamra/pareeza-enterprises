#!/bin/bash

echo "🚀 Uploading Home Page Images to S3..."
echo "📦 Bucket: agrofeed-content-agrofeed-536217686312"
echo ""

# Create temp directory
mkdir -p /tmp/homepage-images

echo "📥 Downloading images from source..."

# 1. Hero Image
echo "⬇️  Hero background..."
curl -L "https://lh3.googleusercontent.com/aida-public/AB6AXuA7nVHkmnkQhAe7yFvtb1ZkfDJG5NCwSe1YaymOfdBYdk7NDYNQ_36-YpJnOHJ0NDFnEuYueQsBXQjO6q0x5ZTO7zsszUSqPCxPYgmc08ecXOXZBkTnfI_p-aGjTPyHjWlLC586YJDZ-9vznSjDcOyhnSfdoUWITE9Tfb-zvSx0fxhahBTL0ZABwQZJy_fEiTZtlImXs9ehoAzyItJ7daB2OXio7L8EWazFvWR0mnijYoUXPNWaqwmdSGaywckhjENZXpU2OuggDlv6" -o /tmp/homepage-images/hero-background.jpg

# 2. Portfolio Images
echo "⬇️  Portfolio images..."
curl -L "https://lh3.googleusercontent.com/aida-public/AB6AXuARMJjbJZ7oYqkkBCU8avIbaHY3mG2lslCcpa_K8vQIz-noj6GMjfwQoQ23QMjaoLYtp_mFwaK6_Nd6d4OVqO9tXEPOuwJG1g3Cp-w3LBvCBFGUDXZSmy4AztCXvxuA0rJekfdwfFc58RxZv9XanFq5SuuB1QPzAF-wH0oRXhL4p44Q27_-vSvLtKVbQjpXm927H1hLkJu3moS_wi4LtU7XGYDGRTUDGMGLng_byga0o49DUrJePncuORmIt5h_m7zos1EOajJNSyqy" -o /tmp/homepage-images/portfolio-rice-spices.jpg

curl -L "https://lh3.googleusercontent.com/aida-public/AB6AXuBNJlbyRQSXGHn1oLBzIdo7gZPOCCemm50gezsP29jEmKuBq3rXwjCOZa39b75vcP-L63lDoUlzrJTMv85mRBUfYuh1_EEppu7IDVFJq2aOa0-42HNxs5oKUZl7-Pa_jZN87iMnTZXk_5ina67pF5HH7wYJJxDUoCSXCRO6pJ10Y3c7_kXMzqRNrxcw2V8f5GFqzg7RPb188ss3x3QG1juuGwXVNQElo6d6fJGHiYKQX4w4rWI10HktHI8lN2j_qiBG0ZSpvqrGL3Mm" -o /tmp/homepage-images/portfolio-citrus.jpg

curl -L "https://lh3.googleusercontent.com/aida-public/AB6AXuDqE2yv_WcBt6FEwf-cf95Ms6es4Mmh-RBWusjugpR7lkctWY5oo5Y-MNjfqgirMRPJ35FA1pARFLzmin3HM0Fy7T7cth_y7h8aU_-r2s_JCzHiOEQTFx45Fqj59BgitDJEyo4VvcsC-sf9olJ7s5rzfY_atB1jcWhtiOm9vEa5HRX-Uw2w6aPB3iD8yHaVp-kvPAg5M5no-posE94Rbcj4ruRHQTKqYRjfVAOQwL01R7_Z-UxdsnFOpdBEBQg6lmg62tGuCrr3oaMF" -o /tmp/homepage-images/portfolio-grains.jpg

curl -L "https://lh3.googleusercontent.com/aida-public/AB6AXuChS4SoAAtMCqyFJBPTMypNQGcZT07-iVaiipmKrR-9J9tr8R9UDKAZa2xotNvsV5YhUSkTFe8xysapWsDCRmPvDoOZv_LkFBEMxxFjutassUQf6ao25qMl03DGtHiYXfZrYvupHycNDvOCXP_39_japRxcT37o-8GihYCoI2VR4MQvkEuRoxncWLTDohZuz2ouOccK1n9DivVkQMk8h3Ugt01sP7m7WHZsaVKMybyb7B5W-yxOApP1Q3O9okSjyxgOH7aeNS2Qp5iF" -o /tmp/homepage-images/portfolio-root-produce.jpg

# 3. CEO Portrait
echo "⬇️  CEO portrait..."
curl -L "https://lh3.googleusercontent.com/aida-public/AB6AXuDWXMk04eqTSsYRirziP7SrEVIemLxm6KtSNtUO-sJICZWmWOJIFc_CZ6ryvHJcv6zDmyP1jE2tZbuvaD5eMgHqioO7YSuHNWN47WLS-sgpgpluDK2HI2VI_oysuwNFw2IawGl60q6XTUHYapOhopKVgGLQ32KkHyA82ofUiw4ks4IlpGyZ06IhTI2O5HcK-vuYJuXPza0nHgw38j1yU9LvHx3SXO8gyfdLrlQ_XWcnbPOGhxEKYkXNcT3tT13PDKVlbw3ppQ6BKctu" -o /tmp/homepage-images/ceo-portrait.jpg

# 4. Infrastructure
echo "⬇️  Infrastructure image..."
curl -L "https://lh3.googleusercontent.com/aida-public/AB6AXuD46nv3bMj1ul-h5o77Wfj8RVuyEKgTLpDQb-uxuKyHSv5cCLWe58GzpxaxwKrchF66k3iUDIVW_90B6TDTsPY1SjUMZuuRq5oTzVP4GZ_-9-bQom0Mj2lkLBis_LO7mbJpmfvheK9qKSrTrn2jjRRo2C-1BeFP1zUYr5HJaXbz8A0XwleVjq7tyx1tgnVBa75hAWYXEw9A5BBiT0FOCh1Gjdybp4XPfRYfyu_lPEdwMjBCe-qHaR6u80-BSxygxaBN5kNIC_OM6ipB" -o /tmp/homepage-images/infrastructure.jpg

# 5. World Map
echo "⬇️  World map..."
curl -L "https://lh3.googleusercontent.com/aida-public/AB6AXuCvnNM_3tBitHxMESjn8TVv3VXcKaQgNhN-RFmQL6nS5QkqA_o_ED5dU39f3dlxIz9i4iaStUn5OuRbD6Bem5gkw3xQZ7B17mWAu8jjzpfOVxEw40p_7lAdjHZYZzbdWxhVSDDhzWik2ahMM0mVle-EgR9lhgkbkMViN5YaNgNkKqdpXIH_qzyhaMEQHJbiEehiTU0snFe40e5-Tfj7C_T7DfOa4XAK_5Lz6QybQ83Cb06KPpYzRtOgYvTrqUDlXfg-GgRBlPkdTeNr" -o /tmp/homepage-images/world-map.jpg

# 6. CSR Images
echo "⬇️  CSR images..."
curl -L "https://lh3.googleusercontent.com/aida-public/AB6AXuA5GAqd_Bck9FnUDk812QJ8cxawBfCc8KNTeYj2xUQ0vG0zxHZtAsKdVhocdD1eOgXbmpZsnBEBdoC5_ZpVR6n8deBrbaBVEtcfx0mL_H2aeq0bkbvlsqf3yAmczIKaJVgYec8Yixk5TxsXOn12N6BbmzuaVrhAN2VJ5ttCx8Ff1tgCGcWchBvKtNybN2iJ-mesONEoWj0fDp_B5dSDc9vudx9hGTv4CbdW0KyAGxKgHDeYQ6E4lp9e24geJKsGmp8MbVmB7T1XCoqU" -o /tmp/homepage-images/csr-soil.jpg

curl -L "https://lh3.googleusercontent.com/aida-public/AB6AXuBRo8-JQGgPgL7lc_bd5wGAXSvrRQh9TjEcOcXR29VWmxzainM65fg0vr6B0gXgEFb7djbSgHc1dPEAgnL5JhPazN0rzcp3jc9qMeZFrkB2wbuEh9-rijBeKABFQMAFmL-yIzFGL0B2iwkTjh1V6CUwr77vE7Lq1N47QcqRX1zed5SbQfN-1mb6pTisOCrDYozk9L_GvQ2wBZyMWNm_k7cs37FDTDJcPOoDc1A4UxJu7H-VjfczOEpBC_XiWdWcE0JZW_19g9xP-awN" -o /tmp/homepage-images/csr-solar.jpg

# 7. News Images
echo "⬇️  News images..."
curl -L "https://lh3.googleusercontent.com/aida-public/AB6AXuBMXWbYsw_5jwb1bnFuEx42eYQ2bm5_rQnYi0ANsNUzp5QzVekVdl5MZh7ougjPWahe6bzB8GSUa75K3su8QkMUnGWwLehgSWDQ9Y3UzA-XR_eMrh-RKVuSZOkLt2m4tdDxQEuUZYcZCIrC-RqmsRell_8ywy1Ovzk4FhdiWDEbMMKWejscGw7kB8zA0H-Sd0HLe5UHdbChL0_WJEMJXW9ecs0TfUxQuP-sAo82IVdDUDKORGyO0-ugtDrCGQokYyy_aWbVZ8rbyZdF" -o /tmp/homepage-images/news-meeting.jpg

curl -L "https://lh3.googleusercontent.com/aida-public/AB6AXuAXpdPh0VF0ClrwpewBYYuj5VODTF7sHEuGRjHWRF_hOVojcBQ2GK8Sk7Jlj0DTf4h-S00-ODC46P-bX4bzK-g7OC2Mbv4WIAFcga-pH5ul7dgO9P-2NYPakXAjVHqwB0L1_WSfcuMbU_uL8_DKEVcADbMxobNB0WXuVvFIPKnIp_eWeWlmw3nVZTMF_CLUB3W3NmTB5g_iEAUK4w7xbe2YaWtuFaVdhCIUbrWi4guJFdy-gINm0zXjWfhV3svFPQ1urU33oU1cOoSF" -o /tmp/homepage-images/news-lab.jpg

curl -L "https://lh3.googleusercontent.com/aida-public/AB6AXuDfGwtAs94QM3Ifzk0HfYjFbnorhwx6LAsBh49eaICLt0C3QB9zVwW0e6w12HuI0BHNuNfEPbJst1nOGi3oDHrDzh398Yyf12IeZbJCf_vlAwK4MWbHQRDYQIBx7Jp4CkrqT45x8gG6Ci9KdgXk2WNDD0QOOMky6b6YLlCvxwgFDN_c72xo896AAC7c9hma5pB_t1iNH_FfN2yUry8DyDWze6mWbDHQa3Gi-iD4pl8T0MFFiT5G1TpKEA2M0L9qOTTWFmtXGqStOEMV" -o /tmp/homepage-images/news-handshake.jpg

# 8. CTA Background
echo "⬇️  CTA background..."
curl -L "https://lh3.googleusercontent.com/aida-public/AB6AXuAIXRf5VsWSRbLJv8d922xzqzUnvRJ_NcXjZygroJT14Kel8hBPcOL6Aq-UPIIh1MFRoQzDq_zJTT414h5ZPpfIh0IyyfWQTZUHoPK1FZ2DKDnzDGBI1FtcCISOq9M0eQoYT08ALND9zv8rCrROQuIlwzDnfRLFJ0npGMnmrRlPEQ3oPo-24xKv16Omc9M1nDH0tYgF2YZWTkru72G-jdqDImc3yTsy9RU1b59z33csjKcYjjaNRAXXNoun12XAh2Qm2WR91cBtGq6c" -o /tmp/homepage-images/cta-background.jpg

echo ""
echo "📤 Uploading to S3..."

# Upload to S3
aws s3 cp /tmp/homepage-images/hero-background.jpg s3://agrofeed-content-agrofeed-536217686312/home/hero-background.jpg --region us-east-1
aws s3 cp /tmp/homepage-images/portfolio-rice-spices.jpg s3://agrofeed-content-agrofeed-536217686312/home/portfolio-rice-spices.jpg --region us-east-1
aws s3 cp /tmp/homepage-images/portfolio-citrus.jpg s3://agrofeed-content-agrofeed-536217686312/home/portfolio-citrus.jpg --region us-east-1
aws s3 cp /tmp/homepage-images/portfolio-grains.jpg s3://agrofeed-content-agrofeed-536217686312/home/portfolio-grains.jpg --region us-east-1
aws s3 cp /tmp/homepage-images/portfolio-root-produce.jpg s3://agrofeed-content-agrofeed-536217686312/home/portfolio-root-produce.jpg --region us-east-1
aws s3 cp /tmp/homepage-images/ceo-portrait.jpg s3://agrofeed-content-agrofeed-536217686312/home/ceo-portrait.jpg --region us-east-1
aws s3 cp /tmp/homepage-images/infrastructure.jpg s3://agrofeed-content-agrofeed-536217686312/home/infrastructure.jpg --region us-east-1
aws s3 cp /tmp/homepage-images/world-map.jpg s3://agrofeed-content-agrofeed-536217686312/home/world-map.jpg --region us-east-1
aws s3 cp /tmp/homepage-images/csr-soil.jpg s3://agrofeed-content-agrofeed-536217686312/home/csr-soil.jpg --region us-east-1
aws s3 cp /tmp/homepage-images/csr-solar.jpg s3://agrofeed-content-agrofeed-536217686312/home/csr-solar.jpg --region us-east-1
aws s3 cp /tmp/homepage-images/news-meeting.jpg s3://agrofeed-content-agrofeed-536217686312/home/news-meeting.jpg --region us-east-1
aws s3 cp /tmp/homepage-images/news-lab.jpg s3://agrofeed-content-agrofeed-536217686312/home/news-lab.jpg --region us-east-1
aws s3 cp /tmp/homepage-images/news-handshake.jpg s3://agrofeed-content-agrofeed-536217686312/home/news-handshake.jpg --region us-east-1
aws s3 cp /tmp/homepage-images/cta-background.jpg s3://agrofeed-content-agrofeed-536217686312/home/cta-background.jpg --region us-east-1

# Make public
echo "🌍 Making images public..."
aws s3 cp s3://agrofeed-content-agrofeed-536217686312/home/ s3://agrofeed-content-agrofeed-536217686312/home/ --recursive --acl public-read --region us-east-1

# Cleanup
rm -rf /tmp/homepage-images

echo ""
echo "✅ Upload complete!"
echo ""
echo "📋 Images uploaded to: s3://agrofeed-content-agrofeed-536217686312/home/"
echo ""
echo "🌐 Test URLs:"
echo "   https://agrofeed-content-agrofeed-536217686312.s3.us-east-1.amazonaws.com/home/hero-background.jpg"
echo "   https://agrofeed-content-agrofeed-536217686312.s3.us-east-1.amazonaws.com/home/portfolio-rice-spices.jpg"
echo "   https://agrofeed-content-agrofeed-536217686312.s3.us-east-1.amazonaws.com/home/ceo-portrait.jpg"
