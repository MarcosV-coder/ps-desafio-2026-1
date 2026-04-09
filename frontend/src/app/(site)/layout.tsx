import Header from "./_components/Header";

export default function SiteLayout ({children}: {children: React.ReactNode}) {
    return (
        <div style={{backgroundColor: 'var(--bg-color)',
            color: 'var(--text-color)',
            display: 'flex',
            flexDirection: 'column',
            transition: 'background-color 0.3s ease, color 0.3s ease'
        }}>
            <link rel="stylesheet" 
                href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
            />
        <Header />
        {children} 
        </div>
    )
}