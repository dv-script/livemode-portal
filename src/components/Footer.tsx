import Link from 'next/link';

export function Footer() {
    return (
        <footer className="w-full bg-black">
            <div className="max-w-[1300px] mx-auto py-4 px-3 text-center">
                <div className="flex justify-center flex-wrap gap-2 md:gap-4">
                    <FooterItem href="#">Legal information</FooterItem>
                    <FooterItem href="#">Privacy policy and cookie policy</FooterItem>
                    <FooterItem href="#">Terms of Use</FooterItem>
                    <FooterItem href="#">Press</FooterItem>
                </div>
                <span className="text-sm text-gray-500 mt-4 block">
                    © 2023 Livemode
                </span>
            </div>
        </footer>
    );
}

function FooterItem({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <Link href={href} passHref>
            <span className="text-xs text-gray-100 px-2 md:px-4 border-r border-gray-100 hover:text-gray-200 hover:underline last:border-r-0">
                {children}
            </span>
        </Link>
    );
}