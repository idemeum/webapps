import React from 'react';
import { Text, Box, Flex } from 'design';
import { useEffect, useState } from 'react';
import { CircleCheck } from 'design/Icon';
import '../assets/idemeum/fonts.css'

export default function Card({ message, redirectUrl, showIcon }: { message?: string, redirectUrl?: string, showIcon?: boolean }) {

    let url = "";
    const [windowSize, setWindowSize] = useState(getWindowSize());

    useEffect(() => {
        function handleWindowResize() {
            setWindowSize(getWindowSize());
        }

        var isRemoteUrl = redirectUrl.includes(".remote.")
        if (isRemoteUrl) {
            url = redirectUrl.replace(".remote.", ".")
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };

    }, []);

    function getWindowSize() {
        const { innerWidth, innerHeight } = window;
        return { innerWidth, innerHeight };
    }
    return (

        <Box css={{ width: windowSize.innerWidth, height: windowSize.innerHeight, backgroundColor: 'white' }}>
            <Box css={{ width: windowSize.innerWidth, height: 60, padding: 15, paddingLeft: 25, backgroundColor: '#007bff' }}>

                <Flex>
                    <svg width="35" height="30" viewBox="0 0 39 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0)">
                            <path d="M38.778 36.1122V31.6704H3.50535C1.5694 31.6704 0 33.2487 0 35.1957V36.1122H38.778Z" fill="#FEFEFE" />
                            <path d="M38.778 26.6509V16.8684C38.778 6.60987 31.3642 0 19.3758 0C7.38754 0 0 6.60987 0 16.8684V26.6509H38.778ZM3.94353 17.3972C3.94353 9.88834 9.83254 4.57402 19.3758 4.57402C28.9192 4.57402 34.8345 9.88834 34.8345 17.3972V22.1034H3.94353V17.3972Z" fill="#FEFEFE" />
                        </g>
                        <defs>
                            <clipPath id="clip0">
                                <rect width="39" height="36.5316" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>

                    <Text style={{ fontSize: 30, paddingLeft: 15, marginTop: 3, fontWeight: 500, fontFamily: 'Red Hat Display' }}>
                        idemeum
                    </Text>
                </Flex>
                {showIcon ? <Flex justifyContent="center" alignItems="center" css={{ paddingTop: 100, marginBottom: -175 }}>
                    <CircleCheck mb={3} fontSize={56} color="success" />
                </Flex> : null}

                <Flex justifyContent="center" alignItems="center">

                    <Text style={{ color: 'black', marginTop: 200, fontSize: 20, fontWeight: 500, fontFamily: 'Red Hat Display' }}>
                        {message}
                    </Text>

                </Flex>

                <Flex justifyContent="center" alignItems="center">
                    <Text style={{ color: 'black', marginTop: 10, fontSize: 15, fontWeight: 500, fontFamily: 'Red Hat Display' }}>
                        Click <a style={{ color: '#007bff' }} href={url}>here</a> to Login Again
                    </Text>
                </Flex>
            </Box>
        </Box>
    );
}