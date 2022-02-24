import { StyleSheet } from 'react-native';
import colors from '../constants/color';

const styles = StyleSheet.create({
    inputContainer: { flexDirection: 'row', marginTop: 20 },

    input: {
        width: 300,
        height: 35,
        margin: 10,
        marginLeft: 30,
        padding: 8,
        color: 'black',
        borderRadius: 14,
        fontSize: 16,
        fontWeight: '500',
    },

    inputIcon: { marginTop: 15, position: 'absolute' },

    btnSecondary: {
        height: 50,
        borderWidth: 1,
        borderColor: '#a5a5a5',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        flex: 1,
        flexDirection: 'row',
    },

    btnImage: { width: 20, height: 20, marginLeft: 5 },

    line: { height: 1, width: 30, backgroundColor: '#a5a5a5' },

    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        height: 50,
        marginTop: 40,
        backgroundColor: colors.primary,
    },

    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },

    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    map: {
        height: 530,
        width: 1000,
    },

    searchBar: {
        height: 300,
        width: 300,
    }
});

export default styles;
