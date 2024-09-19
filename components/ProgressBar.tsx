"use client"

import { AppProgressBar } from 'next-nprogress-bar';
import { colors } from '@/utils/colors';

export const ProgressBar = () => {
    return (
        <AppProgressBar
            height="4px"
            color={colors.accent}
            options={{ showSpinner: false }}
            shallowRouting
        />
    )
}