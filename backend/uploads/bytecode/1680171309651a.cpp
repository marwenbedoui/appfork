#include <jvmti.h>
#include <fstream>
#include <cstring>

void JNICALL OnMethodEntry(jvmtiEnv *jvmti, JNIEnv *env, jthread thread, jmethodID method);

JNIEXPORT jint JNICALL Agent_OnLoad(JavaVM *vm, char *options, void *reserved) {

    jvmtiEnv *jvmti;
    vm->GetEnv((void**)&jvmti, JVMTI_VERSION_1_0);

    jvmtiError error = jvmti->SetEventNotificationMode(JVMTI_ENABLE, JVMTI_EVENT_METHOD_ENTRY, NULL);

    if (error != JVMTI_ERROR_NONE) {
        // Handle error
    }

    jvmtiEventCallbacks callbacks;
    memset(&callbacks, 0, sizeof(callbacks));

    callbacks.MethodEntry = &OnMethodEntry;

    error = jvmti->SetEventCallbacks(&callbacks, sizeof(callbacks));

    if (error != JVMTI_ERROR_NONE) {
        // Handle error
    }

    return JNI_OK;
}

void JNICALL OnMethodEntry(jvmtiEnv *jvmti, JNIEnv *env, jthread thread, jmethodID method) {

    jclass declaring_class;
    char *class_name;
    char *method_name;
    char *method_signature;
    jvmtiError error;

    error = jvmti->GetMethodName(method, &method_name, &method_signature, NULL);

    if (error != JVMTI_ERROR_NONE) {
       // Handle error
    }

    error = jvmti->GetMethodDeclaringClass(method, &declaring_class);

    if (error != JVMTI_ERROR_NONE) {
        // Handle error
    }

    error = jvmti->GetClassSignature(declaring_class, &class_name, NULL);

    if (error != JVMTI_ERROR_NONE) {
        // Handle error
    }

    jlocation start_location = 0;
    jint bytecode_length;
    unsigned char *bytecode_buffer;

    error = jvmti->GetBytecodes(method, &bytecode_length, &bytecode_buffer);

    if (error != JVMTI_ERROR_NONE) {
        // Handle error
    }

    // Save the bytecode to a file
    std::ofstream outfile;
    std::string filename = std::string(class_name) + "." + std::string(method_name) + ".class";
    outfile.open(filename, std::ios::binary | std::ios::out);
    outfile.write((const char *)bytecode_buffer, bytecode_length);
    outfile.close();
}
