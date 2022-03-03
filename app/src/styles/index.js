import { StyleSheet, Dimensions } from 'react-native';
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

    search: {
        position: 'absolute',
        top: '8%',
        width: 300,
        height: 40,
        fontWeight: '500',
        borderRadius: 20,
        marginBottom: Dimensions.get('window').height * 0.92,
        color: '#000',
        borderColor: '#666',
        backgroundColor: '#f8f8f9',
        borderWidth: 1.3,
        paddingHorizontal: 45,
        fontSize: 16,
    },

    searchIcon: {
        position: 'absolute',
        top: '9%',
        left: '12%',
        color: '#28b1a3',
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
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

export default styles;
